import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PopularMovieCard from '../PopularMovieCard'
import Navbar from '../Navbar'
import './index.css'

class Upcoming extends Component {
  state = {
    upcomingMoviesList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getUpcomingMovies()
  }

  getUpcomingMovies = async () => {
    this.setState({
      isLoading: true,
    })
    const apiUrl =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=a161340537ea02f8e85dcffdbe07e10a&language=en-US'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(eachMovie => ({
        id: eachMovie.id,
        imageUrl: eachMovie.poster_path,
        rating: eachMovie.vote_average,
        title: eachMovie.title,
      }))

      this.setState({
        upcomingMoviesList: updatedData,
        isLoading: false,
      })
    }
  }

  renderUpcomingMovies = () => {
    const {upcomingMoviesList} = this.state
    return (
      <>
        <h1>Upcoming Movies</h1>
        <ul className="up-ul-list">
          {upcomingMoviesList.map(eachMovie => (
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
        {isLoading ? this.renderLoadingView() : this.renderUpcomingMovies()}
      </>
    )
  }
}

export default Upcoming
