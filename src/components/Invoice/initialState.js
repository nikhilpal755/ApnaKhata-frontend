

const initialState = {
    items: [
        { itemName: '', unitPrice: '', quantity: '', discount: '' }
      ],
      total: 0,
      notes: '',
      rates: '',
      vat: 0,
      currency: '',
      recordNumber: Math.floor(Math.random() * 100000),
      status: '',
      type: 'Invoice',
      creator: '',
}

export default initialState;
