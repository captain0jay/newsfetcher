import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
  static defaultProps = {
    country: 'in' ,
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string}
    
    constructor(props){
        super(props);
        this.state = {
            articles: [], //<!-- put articles: this.articles when you have samle output instead of link -->
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - jaynews`
    }

    async updaten(){
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=1500a61f461a4b878d6e98c674f8cfed&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      this.props.setProgress(40);
      let parseddata = await data.json()
      console.log(parseddata);
      console.log("next")
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        loading: false
      })
      this.props.setProgress(100);
    }
    async componentDidMount(){
        this.updaten()
    }

    // handleNextClick = async ()=>{
    //   this.setState({page: this.state.page + 1})
    //   this.updaten()
    // }

    // handlePreviousClick = async ()=>{
    //   this.setState({page: this.state.page - 1})
    //   this.updaten()
    // }

    fetchMoreData = async() =>{
      this.setState({page: this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=1500a61f461a4b878d6e98c674f8cfed&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true})
      let data = await fetch(url);
      let parseddata = await data.json()
      console.log(parseddata);
      console.log("next")
      this.setState({
        page: this.state.page + 1,
        articles: this.state.articles.concat(parseddata.articles),
        loading: false
      })
    }

  render() {
    return (
      <>
      {this.state.loading && <Spinner/>}
        <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.articles.length > this.state.totalResults && <Spinner/>}
                >

                <div className="container">
                <div className="row">
          {/* {this.state.loading && <Spinner/>} */}
          {this.state.articles.map((element)=>{//!this.state.loading && 
            return <div className='col-md-3 my-3' key={element.url}>
                <Newsitem title={element.title?element.title:""} description={element.description?element.description.slice(0,50):""} imgurl={element.urlToImage} newsurl={element.url}/>
            </div>

          })}

        </div>
                </div>
        </InfiniteScroll>
{/* 

        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3 mx-3" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page > Math.ceil(this.state.totalResults/8)} type="button" className="btn btn-dark my-3 mx-3" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div> */}
      </>
    )
  }
}

export default news
