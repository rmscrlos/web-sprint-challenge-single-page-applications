import React, {useState} from 'react'
import * as yup from 'yup';
import axios from 'axios';

//Schema
const formSchema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
  size: yup.string().required("Pick you your size"),
  pepperoni: yup.boolean(),
  ham: yup.boolean(),
  bacon: yup.boolean(),
  chicken: yup.boolean(),
  pineapple: yup.boolean(),
  special: yup.string()
})


function Form() {
  // post state
  const [post, setPost] = useState([]);

  // form start
  const [formState, setFormState] = useState({
    name: "",
    size: "",
    pepperoni: "",
    ham: "",
    bacon: "",
    chicken: "",
    pineapple: "",
    special: "",
  });
  
  // error state
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    pepperoni: "",
    ham: "",
    bacon: "",
    chicken: "",
    pineapple: "",
    special: ""
    });

  // validation
  const validate = (e) => {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(val)
      .then(valid => {
        setErrors({...errors, [e.target.name]: ""})
      })
      .catch(err => {
        setErrors({...errors, [e.target.name]: err.errors[0]})
      })
  }

  //onChange handler
  const handleChanges = (e) => {
    e.persist();
    validate(e);
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({...formState, [e.target.name]: value});
  };

  //formSubmit handler
  const formSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
    .then(res => {
      setPost(res.data)
      console.log(res)
      setFormState({
        name: "",
        size: "",
        pepperoni: "",
        ham: "",
        bacon: "",
        chicken: "",
        pineapple: "",
        special: ""
      })
    })
    .catch(err => {
      console.log(err.res);
    })
  }

  
  return (
    <div className="form__container">
      <h1>Build your own!</h1>
      <form onSubmit={formSubmit}>
        {/* Name */}
        <label htmlFor="name">
          Name <br></br>
          <input id="name" name="name" type="text" placeholder="Enter Your Name" onChange={handleChanges} value={formState.name}/>
          </label>
          {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        {/* Sizes */}
        <label htmlFor="size">
          <select name="size" id="size" onChange={handleChanges} value={formState.size}>
            <option value="">--Pick Your Size--</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        {errors.size.length > 0 ? <p className="error">{errors.size}</p> : null}
        {/* Toppings */}
        <h2>Toppings</h2>
        <label htmlFor="pepperoni" >
          <input id="pepperoni" name="pepperoni" type="checkbox" onChange={handleChanges} checked={formState.pepperoni} />
          Pepperoni
        </label>
        
        <label htmlFor="ham">
          <input id="ham" name="ham" type="checkbox" onChange={handleChanges} checked={formState.ham}/>
          Ham
        </label>
        <label htmlFor="bacon">
          <input id="bacon" name="bacon" type="checkbox" onChange={handleChanges} checked={formState.bacon} />
          Bacon
        </label>
        <label htmlFor="chicken">
          <input id="chicken" name="chicken" type="checkbox" onChange={handleChanges}checked={formState.chicken} />
          Chicken
        </label>
        <label htmlFor="pineapple">
          <input id="pineapple" name="pineapple" type="checkbox" onChange={handleChanges} checked={formState.pineapple}/>
          Pineapple
        </label>

        {/* Instructions */}
        <label htmlFor="special">
          Any Instructions?<br></br>
          <textarea type="text" id="special" name="special" placeholder="Add your special Instructions" onChange={handleChanges}/>
        </label>

        <button type="submit">Add To Order</button>
      </form>

      <div className="order">
        <h1>Order up!</h1>
        <p><strong>Name:</strong> {post.name}</p>
        <p><strong>Size:</strong> {post.size}</p><br></br>
        <strong><p>Toppings</p></strong>
        <p>{post.pepperoni ? "Pepperoni" : null}</p>
        <p>{post.ham  ? "Ham" : null}</p>
        <p>{post.bacon  ? "Bacon" : null}</p>
        <p>{post.chicken  ? "Chicken" : null}</p>
        <p>{post.pineapple  ? "Pineapple" : null}</p>
        <br></br>
        <strong><p>instructions</p></strong>
        <p>{post.special}</p>
      </div>
    </div>
  )
}

export default Form
