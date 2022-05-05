// import React from 'react';

// class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       term: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.search = this.search.bind(this);
//   }

//   handleChange(e) {
//     this.setState({
//       term: e.target.value
//     });
//   }

//   search() {
//     this.props.onSearch(this.state.term);
//   }

//   render() {
//     return (<div>
//       Search For A Patent! <input value={this.state.term} onChange={this.handleChange}/>
//       <button onClick={this.search}> Add Repos </button>
//     </div>)
//   }
// }

// export default Search;