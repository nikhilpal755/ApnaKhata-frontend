import React,{useState} from 'react'
import Modal from './modal';



const AddPayment = ({open, setOpen, invoice}) =>{

  
    return (
        <>
            <Modal open={open} setOpen={setOpen} invoice={invoice} />
        </>
    )

}

export default AddPayment;