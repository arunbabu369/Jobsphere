import React from 'react'

const Pagination=({jobperpage,totaljobs,paginate,currentpage})=> {
    const pageNumber=[]
    for(let i=1;i<= Math.ceil(totaljobs/jobperpage);i++)
    {
        pageNumber.push(i)
    }
  return (
    <div>
      <nav className='mt-8'>
        <ul className='flex justify-center items-center'>
            {pageNumber.map(number=>(
                <li key={number}>
                    <button className= {`px-4 py-2 rounded-lg font-semibold mx-2 ${number==currentpage ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} onClick={()=>paginate(number)}>
                        {number}
                    </button>
                </li>))
            }
            
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
