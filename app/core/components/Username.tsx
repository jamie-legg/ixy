import { useCurrentUser } from "../hooks/useCurrentUser"

const Username = () => {
  const currentUser = useCurrentUser()
  return(
    <>{currentUser?.name || currentUser?.email.split("@")[0]}</>
  )
}
export default Username;
