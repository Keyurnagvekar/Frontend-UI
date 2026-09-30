import { useEffect, useState } from "react";
import { Link2, Play, Plus, RotateCw, Square, Terminal, Globe, Search } from "lucide-react";
import Modal from "../components/Modal";
import { serverService } from "../services/serverService";
import type { Server as MCPServer } from "../types/api";

export default function Servers() {
  const [servers,setServers] = useState<MCPServer[]>([]);
  const [search,setSearch] = useState("");
  const [modal,setModal] = useState(false);
  const [name,setName] = useState("");
  const [transport,setTransport] = useState<"stdio"|"http">("stdio");
  const [command,setCommand] = useState("python server.py");
  const [endpoint,setEndpoint] = useState("");
  const [description,setDescription] = useState("");
  const [notice,setNotice] = useState("");

  async function refresh(){ setServers(await serverService.list()); }
  useEffect(()=>{ refresh().catch(()=>setNotice("Unable to load servers.")); },[]);
  const filtered=servers.filter(s=>`${s.name} ${s.description} ${s.transport}`.toLowerCase().includes(search.toLowerCase()));

  async function save(e:React.FormEvent){
    e.preventDefault();
    try { await serverService.create({name,transport,description,command:transport==="stdio"?command:undefined,endpoint:transport==="http"?endpoint:undefined}); setModal(false);setName("");setDescription("");setNotice("Server registered in demo mode.");await refresh(); }
    catch(err){setNotice(err instanceof Error?err.message:"Unable to register server.");}
  }
  async function action(id:string,kind:"connect"|"stop"|"restart"){
    try { await serverService.action(id,kind); setNotice(`Demo action: ${kind} requested.`); await refresh(); }
    catch {setNotice("Server action failed.");}
  }

  return <div className="page-stack" data-testid="servers-page">
    <div className="page-heading"><div><h1>MCP Servers</h1><p>Register and manage MCP server connections.</p></div><button className="button primary" onClick={()=>setModal(true)} data-testid="add-server-btn"><Plus size={17}/> Add Server</button></div>
    {notice&&<div className="notice" role="status" data-testid="server-notice">{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss notice">×</button></div>}
    <div className="filter-row"><div className="search-field"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search servers..." data-testid="server-search" aria-label="Search servers"/></div><span className="muted">{filtered.length} servers</span></div>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Server</th><th>Transport</th><th>Tools</th><th>Status</th><th>Endpoint / Command</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(s=><tr key={s.id} data-testid="server-row" data-server-id={s.id}><td><div className="entity-cell"><span className="entity-icon"><Terminal size={18}/></span><div><strong>{s.name}</strong><small>{s.description}</small></div></div></td><td><code>{s.transport}</code></td><td>{s.toolCount}</td><td><span className={`status-badge ${s.status==="Running"?"success":"neutral"}`} data-testid="server-status"><i className="status-dot"/>{s.status}</span></td><td><code className="command-cell">{s.endpoint||s.command||"Not configured"}</code></td><td><div className="row-actions"><button className="icon-button" aria-label={`Connect ${s.name}`} title="Connect" onClick={()=>action(s.id,"connect")} data-testid="connect-server-btn"><Play size={15}/></button><button className="icon-button" aria-label={`Stop ${s.name}`} title="Stop" onClick={()=>action(s.id,"stop")}><Square size={15}/></button><button className="icon-button" aria-label={`Restart ${s.name}`} title="Restart" onClick={()=>action(s.id,"restart")}><RotateCw size={15}/></button></div></td></tr>)}
    </tbody></table>{filtered.length===0&&<div className="empty-state">No servers match your search.</div>}</div></section>
    <div className="info-banner"><Link2 size={18}/><div><strong>Backend connection is not enabled yet</strong><p>Server actions currently update local demo state. The backend developer can connect these controls to the MCP SDK via the API contract.</p></div></div>
    {modal&&<Modal title="Register MCP Server" onClose={()=>setModal(false)} testId="add-server-modal"><form className="form-stack" onSubmit={save} data-testid="add-server-form">
      <label>Server name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Repository Tools" data-testid="server-name-input"/></label>
      <label>Transport<select value={transport} onChange={e=>setTransport(e.target.value as "stdio"|"http")} data-testid="server-transport-select"><option value="stdio">stdio</option><option value="http">Streamable HTTP</option></select></label>
      {transport==="stdio"?<label>Command<input required value={command} onChange={e=>setCommand(e.target.value)} placeholder="python server.py" data-testid="server-command-input"/></label>:<label>Endpoint<input required type="url" value={endpoint} onChange={e=>setEndpoint(e.target.value)} placeholder="http://localhost:8000/mcp" data-testid="server-endpoint-input"/></label>}
      <label>Description<input value={description} onChange={e=>setDescription(e.target.value)} placeholder="What does this server provide?" data-testid="server-description-input"/></label>
      <div className="notice warning">Demo form only. Backend must validate approved commands/endpoints before starting or connecting to a server.</div>
      <div className="form-actions"><button type="button" className="button secondary" onClick={()=>setModal(false)}>Cancel</button><button className="button primary" type="submit" data-testid="save-server-btn">Register Server</button></div>
    </form></Modal>}
  </div>;
}
