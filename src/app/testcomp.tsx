export default function TestComp({content}: {content: {text: string}}) {
  return (
    <div>
      <p>{content.text}</p>
    </div>
  )
}