import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
    <>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><Link to = "/">Home</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"> <Link to = "/about">About Us</Link></a>
        </li>
        <li className="nav-item ml-2">
            <button class = "btn btn-primary"><Link to ="/signup">SignUp</Link></button>
        </li>
        <li className="nav-item ml-2">
            <button class = "btn btn-primary "><Link to ="/login">Login</Link></button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
    )
}
export default Navbar;