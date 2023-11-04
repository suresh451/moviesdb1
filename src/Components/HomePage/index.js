import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class HomePage extends Component {
  state = {
    popularList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({
      isLoading: true,
    })
    const apiUrl =
      'https://api.themoviedb.org/3/movie/popular?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US&page=1'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))
      this.setState({
        popularList: updatedData,
        isLoading: false,
      })
    }
  }

  renderPopularMovies = () => {
    const {popularList} = this.state
    return (
      <>
        <h1>Popular Movies</h1>
        <ul className="home-ul-list">
          {popularList.map(eachMovie => (
            <PopularMovieCard popularCard={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoadingView() : this.renderPopularMovies()}
      </>
    )
  }
}

export default HomePage
