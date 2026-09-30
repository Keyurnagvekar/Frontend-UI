import { useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, CircleAlert, Clock3, Play, Plus, Server, Wrench, FileText, GitBranch, RefreshCw, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { serverService } from "../services/serverService";
import { toolService } from "../services/toolService";
import { logService } from "../services/logService";
import type { LogEntry, Server as MCPServer, Tool } from "../types/api";

export default function Overview() {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedTool, setSelectedTool] = useState("analyze_repository");
  const [result, setResult] = useState("Select Run Tool to see a demo response.");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    serverService.list().then(setServers).catch(() => setServers([]));
    toolService.list().then(setTools).catch(() => setTools([]));
    logService.list().then(setLogs).catch(() => setLogs([]));
  }, []);

  async function runQuickTest() {
    const tool = tools.find(item => item.name === selectedTool);
    if (!tool) { setResult("Select a tool first."); return; }
    setRunning(true);
    try {
      const response = await toolService.execute(tool.name, tool.serverId, { repo_path: "C:/Projects/my-repo", analysis_type: "summary", include_tests: true });
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Execution failed");
    } finally { setRunning(false); }
  }

  return <div className="page-stack" data-testid="overview-page">
    <div className="page-heading">
      <div><h1>Overview</h1><p>Manage your MCP infrastructure, tools, prompts and integrations.</p></div>
      <div className="heading-actions"><select aria-label="Date range" data-testid="date-range"><option>Last 7 days</option><option>Last 30 days</option><option>Today</option></select><Link className="button primary" to="/servers" data-testid="create-new-button"><Plus size={17}/> Manage Servers</Link></div>
    </div>
    <div className="stat-grid">
      {[
        { label: "MCP Servers", value: servers.length || 3, icon: Server, color: "blue", trend: "1" },
        { label: "Tools", value: tools.length || 12, icon: Wrench, color: "purple", trend: "25%" },
        { label: "Prompts", value: 4, icon: FileText, color: "green", trend: "2" },
        { label: "Tool Executions", value: 124, icon: Activity, color: "blue", trend: "18%" }
      ].map(item => <div className="stat-card" key={item.label} data-testid={`stat-${item.label.toLowerCase().replaceAll(" ", "-")}`}><div className={`stat-icon ${item.color}`}><item.icon size={23}/></div><div className="stat-copy"><strong>{item.value}</strong><span>{item.label}</span></div><span className="trend"><ArrowUpRight size={14}/>{item.trend}</span></div>)}
    </div>
    <div className="dashboard-grid">
      <section className="panel" data-testid="overview-servers-panel">
        <div className="panel-heading"><h2>MCP Servers</h2><Link to="/servers" className="text-link">View all</Link></div>
        <div className="table-wrap"><table><thead><tr><th>Name</th><th>Transport</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {servers.map(server => <tr key={server.id} data-testid="overview-server-row"><td><strong>{server.name}</strong><small className="table-subtitle">{server.description}</small></td><td><code>{server.transport}</code></td><td><span className={`status-badge ${server.status === "Running" ? "success" : "neutral"}`}><span className="status-dot"/>{server.status}</span></td><td><Link to="/servers" className="icon-button small" aria-label={`View ${server.name}`}><ArrowUpRight size={15}/></Link></td></tr>)}
        </tbody></table></div>
      </section>
      <section className="panel" data-testid="execution-activity-panel">
        <div className="panel-heading"><h2>Tool Execution Activity</h2><span className="legend"><i className="green-dot"/> Success <i className="red-dot"/> Failed</span></div>
        <div className="chart" role="img" aria-label="Illustrative tool execution activity chart" data-testid="execution-chart">
          <div className="chart-y-labels"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div>
          <div className="chart-bars">{[20,29,13,19,24,17,31].map((v,i)=><div className="bar-group" key={i}><div className="bar-pair"><span className="bar success-bar" style={{height:`${v*3}px`}}/><span className="bar fail-bar" style={{height:`${[4,7,8,5,7,11,14][i]*3}px`}}/></div><small>Oct {4+i}</small></div>)}</div>
        </div><p className="demo-note">Illustrative demo data — live metrics require backend instrumentation.</p>
      </section>
      <section className="panel" data-testid="recent-executions-panel">
        <div className="panel-heading"><h2>Recent Executions</h2><Link to="/logs" className="text-link">View logs</Link></div>
        <div className="table-wrap"><table><thead><tr><th>Source</th><th>Level</th><th>Message</th></tr></thead><tbody>{logs.slice(0,5).map(log=><tr key={log.id}><td>{log.source}</td><td><span className={`log-level ${log.level.toLowerCase()}`}>{log.level}</span></td><td>{log.message}</td></tr>)}</tbody></table></div>
      </section>
      <section className="panel quick-test" data-testid="quick-tool-test">
        <div className="panel-heading"><h2>Quick Tool Test</h2><span className="demo-chip">Demo mode</span></div>
        <div className="quick-run-row"><label htmlFor="quick-tool-select">Select tool</label><select id="quick-tool-select" data-testid="quick-tool-select" value={selectedTool} onChange={e=>setSelectedTool(e.target.value)}>{tools.map(tool=><option key={tool.id} value={tool.name}>{tool.name}</option>)}</select><button className="button primary" onClick={runQuickTest} disabled={running} data-testid="run-quick-tool"><Play size={15}/>{running?"Running...":"Run Tool"}</button></div>
        <div className="code-header"><span>Result preview</span><button className="text-link" onClick={()=>setResult("Select Run Tool to see a demo response.")} data-testid="clear-quick-result">Clear</button></div>
        <pre className="code-block" data-testid="quick-tool-result">{result}</pre>
      </section>
      <section className="panel" data-testid="system-status-panel">
        <div className="panel-heading"><h2>System Status</h2><button className="text-link" onClick={()=>serverService.list().then(setServers)} data-testid="refresh-status"><RefreshCw size={14}/> Refresh</button></div>
        {[
          {name:"MCP Runtime",desc:"Server connection lifecycle",ok:servers.some(s=>s.status==="Running")},
          {name:"API Integration",desc:"Backend adapter",ok:false},
          {name:"Persistence",desc:"Database adapter",ok:false}
        ].map(s=><div className="health-row" key={s.name}><span className={s.ok?"live-dot":"muted-dot"}/><div><strong>{s.name}</strong><small>{s.desc}</small></div><span className={`status-badge ${s.ok?"success":"neutral"}`}>{s.ok?"Demo ready":"Pending"}</span></div>)}
        <p className="demo-note">API and persistence are placeholders until backend integration.</p>
      </section>
    </div>
  </div>;
}
