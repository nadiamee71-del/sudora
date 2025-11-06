export function Button({children,kind='primary',...props}){
  const cls = 'btn'+(kind==='ghost'?' ghost':'')
  return <button className={cls} {...props}>{children}</button>
}

export function Input(props){ return <input className="input" {...props}/> }

export function Select({children,...props}){ return <select className="select" {...props}>{children}</select> }

export function Pill({active,children,...props}){ return <button className={'pill'+(active?' active':'')} {...props}>{children}</button> }

export function Card({children}){ return <div className="card">{children}</div> }

