import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { logService } from "../services/logService";
import type { LogEntry } from "../types/api";

export default function Logs(){
 const [items,setItems]=useState<LogEntry[]>([]);const [level,setLevel]=useState("All levels");const [search,setSearch]=useState("");const [notice,setNotice]=useState("");
 async function load(){setItems(await logService.list());}
 useEffect(()=>{load().catch(()=>setNotice("Unable to load logs."));},[]);
 const filtered=items.filter(item=>(level==="All levels"||item.level===level)&&`${item.message} ${item.source} ${item.time}`.toLowerCase().includes(search.toLowerCase()));
 return <div className="page-stack" data-testid="logs-page"><div className="page-heading"><div><h1>Execution Logs</h1><p>Review tool execution history and application events.</p></div><button className="button secondary" onClick={()=>load().catch(()=>setNotice("Unable to refresh logs."))} data-testid="refresh-logs-btn"><RefreshCw size={15}/> Refresh</button></div>{notice&&<div className="notice" role="status">{notice}</div>}<div className="filter-row"><div className="search-field"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search messages or sources..." data-testid="log-search" aria-label="Search logs"/></div><select value={level} onChange={e=>setLevel(e.target.value)} data-testid="log-level-filter" aria-label="Filter log level"><option>All levels</option><option>INFO</option><option>WARN</option><option>ERROR</option></select><span className="muted">{filtered.length} entries</span></div><section className="panel"><div className="table-wrap"><table><thead><tr><th>Time</th><th>Level</th><th>Source</th><th>Message</th></tr></thead><tbody>{filtered.map(item=><tr key={item.id} data-testid="log-row"><td><code>{item.time}</code></td><td><span className={`log-level ${item.level.toLowerCase()}`}>{item.level}</span></td><td>{item.source}</td><td>{item.message}</td></tr>)}</tbody></table>{!filtered.length&&<div className="empty-state">No log entries match your filters.</div>}</div><div className="panel-footer">Demo log entries only <span>Connect the backend for persisted, real execution logs.</span></div></section></div>;
}
