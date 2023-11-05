/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useTasks } from '../ContextProvider';
import { getItems } from '../services';
import Item from './Item';
import SpinnerComponent from './Spinner';

function ItemsLister() {
  const { 				
    items,
    setItems,
    fireEvent,
    loading,
    setLoading,
    filter } = useTasks();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireEvent]);


  return (
    <div className='itemLister'>
      {!loading &&
        items
          .filter(item => (filter ? !item.is_completed : true))
          .map((item) => (
            <Item key={item.id} item={item} />
          ))}
      {loading && <SpinnerComponent />}
    </div>
  );
  
}

export default ItemsLister;
