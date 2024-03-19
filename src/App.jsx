import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Category from './Category'
import axios from 'axios';

function App() {
  let [finalCategory, setFinalCategory] = useState([])
  let [finalPro, setFinalPro] = useState([])
  let [catName, setCatName] = useState('')

  let getCategory=()=>{
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>res.data)
    .then((finalRes)=>{
      setFinalCategory(finalRes)
    })
  }

  let getProducts=()=>{
    axios.get('https://dummyjson.com/products')
    .then((proRes)=>proRes.data)
    .then((finalRes)=>{
      setFinalPro(finalRes.products)
    })
  }

  useEffect(()=>{
    getCategory();
    getProducts();
  },[])

  useEffect(()=>{
    if(catName !==""){
      axios.get(`https://dummyjson.com/products/category/${catName}`)
      .then((proRes)=>proRes.data)
      .then((finalRes)=>{
        setFinalPro(finalRes.products)
      })
    }
  },[catName])

  let Pitems=finalPro.map((products, index)=>{
    return(
      <ProductItems key={index} pdata={products}/>
    )
  })

  return (
    <>
    <div className='py-[40px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center text-[40px] font-[500] mb-[20px]'>Our Products</h1>
        <div className='grid grid-cols-[30%_auto] gap[20px] '>
          <div className=''>
            
            <Category finalCategory={finalCategory} setCatName={setCatName}/>
          </div>
          <div>
            <div className='grid grid-cols-3 gap-5'>
              
              {
                finalPro.length>=1 
                ? 
                Pitems
                :
                'No data Found'
              }

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App

function ProductItems({pdata}){
  return(
    <div className='shadow-lg text-center pb-4'>
      <img src={pdata.thumbnail} alt="hello" className='w-[100%] h-[220px]'/>
      <h4> {pdata.title} </h4>
      <b> {pdata.price} </b>
    </div>
  )
}