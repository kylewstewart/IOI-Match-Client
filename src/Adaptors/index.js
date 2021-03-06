
// const url = "http://localhost:3000"
const url =  "https://ioi-match-api.herokuapp.com"

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
  }

export class Adaptors {

  static IOIs(id){
    return fetch(url + `/api/v1/principals/${id}/iois`)
      .then(res => res.json())
  }

  static UpdateIOI(IOI){
    return fetch(url + `/api/v1/iois/${IOI.id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({IOI})
    }).then(res => res.json())
  }

  static CreateIOI(IOI, principal_id){
    return fetch(url + `/api/v1/principals/${principal_id}/iois`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({IOI})
    }).then(res => res.json())
  }

  static DestroyIOI(IOI_id){
    return fetch(url + `/api/v1/iois/${IOI_id}`, {
      method: 'DELETE',
      headers: headers
    }).then(res => res.json() )
  }

  static Sponsors(principal_id){
    return fetch(url + `/api/v1/principals/${principal_id}/sponsors`)
      .then(res => res.json())
  }

  static Stocks(){
    return fetch(url + '/api/v1/stocks')
      .then(res => res.json())
  }

  static PrincipalNegotiations(principal_id){
    return fetch(url + `/api/v1/principals/${principal_id}/negotiations`)
      .then(res => res.json())
  }

  static AgentNegotiations(agent_id){
    return fetch(url + `/api/v1/agents/${agent_id}/negotiations`)
      .then(res => res.json())
  }

  static Principals(){
    return fetch(url + '/api/v1/principals')
      .then(res => res.json())
  }

  static Agents(){
    return fetch(url + '/api/v1/agents')
      .then(res => res.json())
  }

  static Sponsorships(agent_id){
    return fetch(url + `/api/v1/agents/${agent_id}/sponsorships`)
      .then(res => res.json())
  }

  static NegPrincipals(neg_id){
    return fetch(url + `/api/v1/negotiations/${neg_id}/negotiation_principals`)
      .then(res => res.json())
  }

  static UpdateNegotiationPrincipal(id, update){
    return fetch(url + `/api/v1/negotiation_principals/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({update})
    }).then(res => res.json())
  }

  static UpdateNegotiation(id, update){
    return fetch(url + `/api/v1/negotiations/${id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({update})
    }).then(res => res.json())
  }

  static matchStocks(){
    return fetch(url + '/api/v1/match_stocks')
      .then(res => res.json())
  }

  static match(id){
    return fetch(url + `/api/v1/match/${id}`)
      .then(res => res.json())
  }

  static common(match){
    return fetch(url + '/api/v1/common', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ match })
    }).then(res => res.json())
  }

  static rankedVoting(common, match){
    return fetch(url + '/api/v1/ranked_voting', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ common, match })
    }).then(res => res.json())
  }

}
