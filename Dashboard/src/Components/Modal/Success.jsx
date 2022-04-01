import React ,{ useRef }from 'react'
import './successError.scss'



const success = ({message}) => {
	const Show=useRef(null)
  return (
    <div className="submit-modal" ref={Show}>
		<div className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate" >
			<div className="icon">
				<span className="glyphicon glyphicon-ok">✔️</span>
			</div>
			<h1>Success! H-Coder</h1>
			<p>{message}</p>
			<button type="button" className="redo btn" onClick={()=>Show.current.classList.remove("show")}>Ok</button>
		</div>
	</div>
  )
}

export default success