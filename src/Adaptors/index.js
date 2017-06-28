
const url = "http://localhost:3000"


export class Adaptors {

  static IOIs(id){
    return fetch(url + `/api/v1/principals/${id}/iois`)
    .then(res => res.json())
  }
}
