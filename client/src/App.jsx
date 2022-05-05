import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../dist/styles.css';

const App = () => {

  const [state, setState] = useState({search:'', results:[], saved:[], flag: false});
  let display;
  useEffect(() => {
    axios.get('/saved')
    .then((res)=>{
      setState({
        ...state,
        saved: res.data
      })
      console.log(res.data)
    })
    .catch((err)=>{
      console.error(err)
    })
    // axios.get('http://localhost:3000/patents')
    // .then((data)=>{
    //   console.log()
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
    // if (state.results.length < 1) {
    //   display = <div>Find If It Exists Or Not</div>
    // } else {
    //   let resultsArr = [];
    //   for(let res in state.results){
    //     resultsArr.push(state.results[res]);
    //   }
    //   setState({...state, results: resultsArr})
    // }
  },[state.search, state.flag]);

// search (term) {

// }

  const handleSearch = (search) => {
    console.log(search)
    let newArr = [];
    axios.post(`/patents`, {search: search})
    .then((res)=>{
      if (res.data.patents) {
        setState({
          ...state,
          results: res.data.patents
        })
      } else {
        setState({
          ...state,
          results: []
        })
      }

    })
    .catch((err)=>{
      console.error(err);
    })
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }

  const handleSave = (patent) => {
    console.log(patent)
    axios.post("/save", patent)
    .then(()=>{
      console.log('saved')
      setState({
        ...state,
        flag: !state.flag
      })
      // console.log(state.saved)
    })
    .catch((err)=>{
      console.error(err)
    })
      // let prevSaved = state.saved;
      // console.log('prevsaved', prevSaved)
      // setState({
      //   ...state,
      //   saved: [...prevSaved, res.patent_id]
      // })
  }

  return (
    <div>
      <h1>Patent Seeker</h1>
      <input type='text' name='search' value={state.search} placeholder="Search For Patent" onChange={handleChange}/>
      <input type='submit' onClick={()=>handleSearch(state.search)}/>
      {state.results.length === 0 && <div>No results</div>}
      {state.results.length > 0 && state.results.map(res => {
        return (
          <div>
            <h3>{res.patent_title}</h3>
            {/* {state.saved.filter(e => e.patent_id === res.patent_id).length <= 0 && <input type='button' value='save' onClick={()=>handleSave(res)}/>} */}
            {/* {state.saved.filter(e => e.patent_id === res.patent_id).length > 0 && <input type='button' value='saved!'/>} */}
            {/* {state.saved.includes(res.patent_id) && <input type='button' value='saved!'/>} */}
          </div>

        )
      })}
    </div>

  );


}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));