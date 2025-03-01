import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'flowbite/dist/flowbite.min.js'
import TokencontextProvider from './components/context/Tokencontext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartcontextProvider from './components/context/Cart/Cartcontext.jsx'
import OrderContexProvider from './components/context/Order/OrderContex.jsx'
import WishlistContextProvider from './components/context/Wishlist/Wishlistcontext.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
<TokencontextProvider>
<CartcontextProvider>
<OrderContexProvider>
<WishlistContextProvider>
<App/>
</WishlistContextProvider>
</OrderContexProvider>
</CartcontextProvider>
</TokencontextProvider>
</Provider>
  </>
)
