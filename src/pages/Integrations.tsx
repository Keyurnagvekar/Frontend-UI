import { useEffect, useState } from "react";
import { Github, Folder, Database, FlaskConical, PlugZap } from "lucide-react";
import { integrationService } from "../services/integrationService";
import type { Integration } from "../types/api";

const iconFor=(id:string)=>id==="github"?Github:id==="local-repo"?Folder:id==="database"?Database:FlaskConical;

export default function Integrations(){
 const [items,setItems]=useState<Integration[]>([]);const [notice,setNotice]=useState("");
 useEffect(()=>{integrationService.list().then(setItems).catch(()=>setNotice("Unable to load integrations."));},[]);
 async function toggle(item:Integration){try{const updated=await integrationService.setEnabled(item.id,!item.enabled);setItems(prev=>prev.map(i=>i.id===updated.id?updated:i));setNotice(`${item.name} ${updated.enabled?"enabled":"disabled"} in demo mode.`);}catch{setNotice("Unable to update integration.");}}
 return <div className="page-stack" data-testid="integrations-page"><div className="page-heading"><div><h1>Integrations</h1><p>Manage external systems and capabilities available to your services.</p></div><span className="demo-chip">Demo configuration</span></div>{notice&&<div className="notice" role="status">{notice}<button onClick={()=>setNotice("")} aria-label="Dismiss notice">×</button></div>}<div className="integration-grid">{items.map(item=>{const Icon=iconFor(item.id);return <section className="panel integration-card" key={item.id} data-testid="integration-card" data-integration-id={item.id}><div className="integration-top"><span className="entity-icon large"><Icon size={23}/></span><span className={`status-badge ${item.enabled?"success":"neutral"}`}>{item.status}</span></div><h2>{item.name}</h2><p>{item.description}</p><div className="integration-meta"><span>{item.kind}</span><label className="switch-control"><input type="checkbox" checked={item.enabled} onChange={()=>toggle(item)} data-testid={`integration-toggle-${item.id}`} aria-label={`Enable ${item.name}`}/><span className="switch-slider"/></label></div></section>})}</div><div className="info-banner"><PlugZap size={19}/><div><strong>Credentials are backend-owned</strong><p>Production integrations should use backend-side secret storage and explicit authorization. The browser only displays connection metadata.</p></div></div></div>;
}
