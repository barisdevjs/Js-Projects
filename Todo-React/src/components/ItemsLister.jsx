/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useShoppingCart } from '../ContextProvider';
import { getItems } from '../services';
import Item from './Item';

function ItemsLister() {
  const {
    items,setItems,loading,setLoading } = useShoppingCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getItems();
        setItems(res);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='itemLister'>
      {!loading && items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default ItemsLister;
