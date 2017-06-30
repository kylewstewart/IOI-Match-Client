
const url = "http://localhost:3000"


export class Adaptors {

  static IOIs(id){
    return fetch(url + `/api/v1/principals/${id}/iois`)
      .then(res => res.json())
  }

  static Sponsors(principal_id){
    return fetch(url + `/api/v1/principals/${principal_id}/sponsors`)
      .then(res => res.json())
  }

  static Stocks(){
    return fetch(url + '/api/v1/stocks')
      .then(res => res.json())
  }

  static AgentPctTraded(agent_id){
    return fetch(url + `/api/v1/agents/${agent_id}/pct_traded`)
      .then(res => res.json)
  }

  static AgentSatisfaction(agent_id){
    return fetch(url + `/api/v1/agents/${agent_id}/satisfaction`)
      .then(res => res.json)
  }
}
