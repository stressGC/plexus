import React from "react"
import { IPerson } from "../types/plexus"

interface IPersonProps {
	person: IPerson,
}

class Person extends React.Component<IPersonProps> {
	public render = () => {
		const { person } = this.props
		return (
			<div className="p-3">
				<div id="person" className="row">
					<div className="col-md-4">
						<img src={person.svg} className="img-thumbnail" />
					</div>
					<div className="col-md-8">
						<h1>{person.name} - <small>{person.age}</small></h1>
						<h3 className="text-secondary">{person.company}</h3>
						{
							["friend", "surf", "tech"].map((tag) => (
								<span key={tag} className="badge badge-secondary mx-1">#{tag}</span>
							))
						}
					</div>
				</div>
				{/* <div className="row">
					<form>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
							<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
						</div>
						<div className="form-check">
							<input type="checkbox" className="form-check-input" id="exampleCheck1" />
							<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div> */}
			</div>
		)
	}
}

export default Person
