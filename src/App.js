import { useState } from "react"
import axios from "axios";
// import FileBase64 from "react-file-base64";
function App() {
  const [successM, setSuccess] = useState('')
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
        product_name: "",
        product_description: "",
        price: "",
        rating: "",
        brand: "",
        category: "",
        image: null,
  })



  const [getProduct, setGetProduct] = useState({
    name: "",
  })

  const handleChangeListener = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setGetProduct((prevState) => ({
        ...prevState,
        [name]: value
    }))
  }

  const handleGetProduct = async (e) => {
    console.log(getProduct);
    e.preventDefault();
    try {
        const response = await axios.get('https://vitachi-ecommerce-backend.herokuapp.com/products', {
            params: {getProduct}
        })
        
        console.log(response.data)
        setData(response.data)
    } catch (error) {
        console.log(error)
    }
}

  const handleChange = (e) => {
    console.log('e', e);
    let value = e.target.value
    const name = e.target.name
    if (e.target.name === "image") {
      value = e.target.files[0];
    }
    setFormData((prevState) => ({
        ...prevState,
        [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    console.log('eee')
    e.preventDefault();
    console.log(formData)

    try {
        // const response = await axios.post('http://localhost:3004/addproduct', {formData})
        const response = await axios({
          method: "post",
          url: "https://vitachi-ecommerce-backend.herokuapp.com/addproduct",
          data: formData,
          headers: { "Content-Type": "multipart/form-data",
        },
        });
        console.log(response)
        const success = response.status === 200
        if (success) {
          let today = new Date();
          let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
          let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let dateTime = date+' -- '+time;
          setSuccess(`${dateTime}`);
        }
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="app">
      <div className="register-form">
        <h2>Add product: </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="product_name">Tên sản phẩm</label>
              <input 
                  id="product_name"
                  type="text"
                  name="product_name"
                  placeholder="Swisse Mens Multivitamin 120 Tablets NEW"
                  required={true}
                  value={formData.product_name}
                  onChange={handleChange}
              />
              <label htmlFor="product_description">Thông tin sản phẩm</label>
              <textarea
                  id="product_description"
                  type="text"
                  name="product_description"
                  placeholder="Swisse Ultivite Men's Multivitamin is a comprehensive multivitamin tailored for men. It supports general wellbeing, energy production and vitality."
                  required={true}
                  value={formData.product_description}
                  onChange={handleChange}
              ></textarea>
              <label htmlFor="price">Giá - VND</label>
              <input 
                  id="price"
                  type="number"
                  name="price"
                  placeholder="1250K"
                  required={true}
                  value={formData.price}
                  onChange={handleChange}
              />
              <label htmlFor="rating">Rating</label>
              <input 
                  id="rating"
                  type="number"
                  name="rating"
                  placeholder="4 (out of 5)"
                  required={true}
                  value={formData.rating}
                  onChange={handleChange}
              />
              <label htmlFor="rating">Thương hiệu</label>
              <input 
                  id="brand"
                  type="text"
                  name="brand"
                  placeholder="Nature's Own"
                  required={true}
                  value={formData.brand}
                  onChange={handleChange}
              />
              <label htmlFor="category">Category</label>
              <select name="category" id="category" onChange={handleChange}>
                <option value="none"></option>
                <option value="baby">Baby care</option>
                <option value="pregnancy">Pregnancy care</option>
                <option value="vitamins">Vitamins</option>
                <option value="women">Women's health & beauty</option>
                <option value="elderly">Elderly</option>
                <option value="men">Men's health</option>
                <option value="dental">Dental care</option>
              </select>
              <label htmlFor="image">Hình ảnh</label>
              <input 
                  id="image"
                  type="file"
                  name="image"
                  required={true}
                  onChange={handleChange}
              />
            <input type="submit"/>
            <p>{successM}</p>
        </form>
      </div>
                
      <div className="get-product">
        <h2>Search product: </h2>
        <form onSubmit={handleGetProduct}>
              <label htmlFor="name">Product name: </label>
              <input 
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Swisse Mens Multivitamin 120 Tablets NEW"
                  required={true}
                  value={getProduct.name}
                  onChange={handleChangeListener}
              /> 
              <input type="submit"/>
          </form>
        <div className="result">
          <h2>Result</h2>
          {
              data ? (
                  <table>
                    <thead>
                      <tr key={"header"}>
                        <th>Tên sản phẩm</th>
                        <th>Thông tin sản phẩm</th>
                        <th>Giá</th>
                        <th>Rating</th>
                        <th>Thương hiệu</th>
                        <th>Category</th>
                        <th>Hình ảnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.product_name}</td>
                        <td className="description">{data.product_description}</td>
                        <td>{data.price}</td>
                        <td>{data.rating}</td>
                        <td>{data.brand}</td>
                        <td>{data.category}</td>
                        <td>
                          {
                            data.image ? (
                              <img src={`data:image/png;base64,${data.image.data.buffer}`} width="300" alt="returned"/>
                            ) : (
                              <div></div>
                            )
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
              ) : (
                  <p></p>
              )
          }               
        </div>
      </div>
    </div>
  );
}

export default App;
