/*
*
*Aditia Dwi Pratomo 1942806
*Erio Hermawan 1942808
*
*
*/
export default function({ store, redirect }) {
    if(!Object.keys(store.state.user).length) {
      redirect('/?message=noUser');
    }
  }