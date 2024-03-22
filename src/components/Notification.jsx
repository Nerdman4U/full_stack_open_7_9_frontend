import { useSelector } from 'react-redux'

const Notification = () => {
  const obj = useSelector(state => state.notification)
  if (!obj.message) return null
  return <div className={obj.type}>{obj.message}</div>
}

export default Notification
