import Typical from "react-typical";

interface ITermProps {
  terms: string[]
}

const Term = ({ terms }: ITermProps) => {
  return(
    <>
    <code>
      <Typical
        steps={[
          terms[0], 1000,
          terms[1], 1000,
          terms[2], 1000
        ]}
      />
    </code>
    </>
  )
  }

export default Term;
