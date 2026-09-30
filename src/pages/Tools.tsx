import { useEffect, useMemo, useState } from "react";
import { Play, Plus, Search, SlidersHorizontal, Code2, Pencil, MoreVertical, Copy } from "lucide-react";
import Modal from "../components/Modal";
import { toolService } from "../services/toolService";
import { serverService } from "../services/serverService";
import type { Server as MCPServer, Tool } from "../types/api";

export default function Tools(){
 const [tools,setTools]=useState<Tool[]>([]);const [servers,setServers]=useState<MCPServer[]>([]);
 const [search,setSearch]=useState("");const [category,setCategory]=useState("All categories");const [selected,setSelected]=useState<Tool|null>(null);
 const [modal,setModal]=useState(false);const [name,setName]=useState("");const [description,setDescription]=useState("");const [newCategory,setNewCategory]=useState("Custom");const [serverId,setServerId]=useState("local-mcp");const [notice,setNotice]=useState("");const [runResult,setRunResult]=useState("");
 async function load(){const [t,s]=await Promise.all([toolService.list(),serverService.list()]);setTools(t);setServers(s);if(!selected&&t.length)setSelected(t[0]);}
 useEffect(()=>{load().catch(()=>setNotice("Unable to load tools."));},[]);
 const categories=useMemo(()=>["All categories",...Array.from(new Set(tools.map(t=>t.category)))],[tools]);
 const filtered=tools.filter(t=>`${t.name} ${t.description} ${t.category}`.toLowerCase().includes(search.toLowerCase())&&(category==="All categories"||t.category===category));
 async function save(e:React.FormEvent){e.preventDefault();try{const item=await toolService.create({name,description,category:newCategory,serverId});setSelected(item);setModal(false);setName("");setDescription("");setNotice("Tool metadata added in demo mode.");await load();}catch(err){setNotice(err instanceof Error?err.message:"Could not create tool.");}}
 async function run(){if(!selected)return;try{const result=await toolService.execute(selected.name,selected.serverId,{});setRunResult(JSON.stringify(result,null,2));}catch(err){setRunResult(err instanceof Error?err.message:"Execution failed");}}
 return <div className="page-stack" data-testid="tools-page">
  <div className="page-heading"><div><h1>Tools</h1><p>Discover, inspect and test tools exposed by your MCP servers.</p></div><button className="button primary" onClick={()=>setModal(true)} data-testid="add-tool-btn"><Plus size={17}/> Add Tool</button></div>
  {notice&&<div className="notice" role="status">{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss notice">×</button></div>}
  <div className="catalog-layout">
   <section className="panel catalog-main">
    <div className="filter-row"><div className="search-field"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tools by name, description or tag..." data-testid="tool-search" aria-label="Search tools"/></div><select value={category} onChange={e=>setCategory(e.target.value)} data-testid="tool-category-filter" aria-label="Filter by category">{categories.map(c=><option key={c}>{c}</option>)}</select><button className="button secondary" data-testid="tool-filter-button"><SlidersHorizontal size={15}/> Filter</button></div>
    <div className="tool-list" data-testid="tool-list">{filtered.map(tool=><button className={`tool-row ${selected?.id===tool.id?"selected":""}`} key={tool.id} onClick={()=>{setSelected(tool);setRunResult("");}} data-testid="tool-row" data-tool-name={tool.name}>
      <span className="entity-icon"><Code2 size={19}/></span><span className="tool-row-copy"><strong>{tool.name}</strong><small>{tool.description}</small></span><span className="category-chip">{tool.category}</span><span className={`status-badge ${tool.status==="Active"?"success":"neutral"}`}>{tool.status}</span><span className="row-actions"><span className="icon-button small"><Play size={14}/></span><span className="icon-button small"><Pencil size={14}/></span></span>
    </button>)}
    {filtered.length===0&&<div className="empty-state">No tools found.</div>}</div>
    <div className="panel-footer">Showing {filtered.length} of {tools.length} tools <span>Demo records until MCP discovery is connected</span></div>
   </section>
   <aside className="panel detail-panel" data-testid="tool-details-panel">
    <div className="tabs"><button className="tab active">Details</button><button className="tab">Input Schema</button><button className="tab">Usage</button></div>
    {selected?<><div className="detail-title"><span className="entity-icon large"><Code2 size={23}/></span><div><h2>{selected.name}</h2><span className="status-badge success">Active</span></div></div>
     <label className="detail-field">Description<p>{selected.description}</p></label><div className="two-col"><label className="detail-field">Category<p>{selected.category}</p></label><label className="detail-field">Server<p>{servers.find(s=>s.id===selected.serverId)?.name||selected.serverId}</p></label></div>
     <label className="detail-field">Input schema<pre className="code-block schema-block">{JSON.stringify(selected.inputSchema||{type:"object",properties:{}},null,2)}</pre></label>
     <button className="button primary full-width" onClick={run} data-testid="run-tool-btn"><Play size={15}/> Run Tool</button>
     {runResult&&<pre className="code-block result-block" data-testid="tool-execution-result">{runResult}</pre>}
    </>:<div className="empty-state">Select a tool to view details.</div>}
   </aside>
  </div>
  {modal&&<Modal title="Add Tool Metadata" onClose={()=>setModal(false)} testId="add-tool-modal"><form className="form-stack" onSubmit={save} data-testid="add-tool-form">
   <label>Tool name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. analyze_repository" data-testid="tool-name-input"/></label>
   <label>Description<input required value={description} onChange={e=>setDescription(e.target.value)} placeholder="What does this tool do?" data-testid="tool-description-input"/></label>
   <label>Category<input value={newCategory} onChange={e=>setNewCategory(e.target.value)} required data-testid="tool-new-category-input"/></label>
   <label>Server<select value={serverId} onChange={e=>setServerId(e.target.value)} data-testid="tool-server-select">{servers.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
   <div className="notice warning">This adds demo registry metadata only; real MCP tools should be discovered from a connected server.</div>
   <div className="form-actions"><button type="button" className="button secondary" onClick={()=>setModal(false)}>Cancel</button><button className="button primary" type="submit" data-testid="save-tool-btn">Save Tool</button></div>
  </form></Modal>}
 </div>;
}
