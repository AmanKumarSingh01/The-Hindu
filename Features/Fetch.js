import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const FetchSlice = createSlice({
  name: 'counter',
  initialState: {
    isLoded: false,
    National : {},
    International : {},
    Edtiorial : {},
    News : '',
    isLodingNews : false,
  },
  reducers: {
    setNational : (state , action) => {
      state.National = action.payload
    },
    setInternational : (state , action) =>{
      state.International = action.payload
    },
    setEditorial : (state , action) => {
      state.Edtiorial = action.payload
    },
    setLoading : (state) => {
      state.isLoded =true;
      console.log(state.National)
      
    },
    setDetails : (state , action) =>{
      state.News = action.payload.Response;
    },
    resetDetails : (state) => {
      state.News = '',
      state.isLodingNews = false
    },
    setLoadingNews : (state) => {
      state.isLodingNews = true
    }
  },
});

export const {setNational ,setInternational ,setEditorial, setLoading ,setDetails , resetDetails ,setLoadingNews} = FetchSlice.actions;

export const init = () => async(dispatch) => {
    const payload = {
        pages : 5
    }
    await Axios.post('https://greatscrapper.herokuapp.com/api/national-headlines-with-pictures/' , payload)
        .then(async(res) =>{
            console.log("Loaded Naitonal")
            dispatch(setNational(res.data));
            await Axios.post('https://greatscrapper.herokuapp.com/api/international/' , payload)
              .then(async (I) => {
                console.log("Loaded International")
                // localStorage.setItem({"International" : I.data})
                dispatch(setInternational(I.data));
                await Axios.post('https://greatscrapper.herokuapp.com/api/editorial/', payload)
                  .then(E => {
                    console.log("Loaded Editorial")
                    dispatch(setEditorial(E.data));
                    dispatch(setLoading())
                  })
              })
        })
        .catch(console.error)
};

export const details =(url) => async(dispatch) => {
  const payload = {
    url : url
  }
  dispatch(resetDetails());
  await Axios.post('https://greatscrapper.herokuapp.com/api/get-stuffs/' , payload)
        .then(res => {
            dispatch(resetDetails());
            dispatch(setDetails(res.data))
            dispatch(setLoadingNews());
            console.log(res.data)
        })
        .catch(console.error)
}

export const selectCount = state => state.counter.value;

export default FetchSlice.reducer;