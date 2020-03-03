import React from "react"
import NotesList from "../../components/NotesList"
import NoteModel from "../../models/Note"
import { actionFetchNotes } from "../../actions"
import { connect } from "react-redux"
import { AppState } from "../../reducers"

interface HomeViewProps {
	loadData: () => () => void,
	notes: NoteModel[],
	state: string,
	errorMessage?: string
}

// tslint:disable-next-line: no-empty-interface
interface HomeViewState {}

class HomeView extends React.Component<HomeViewProps, HomeViewState> {
	constructor(props: HomeViewProps, state: HomeViewState) {
		super(props, state)
	}

	componentDidMount() {
		if (this.props.state === "INIT") {
			this.props.loadData()
		}
	}

	render() {
		console.log(this.props.state, this.props.notes)
		return (
			<section>
				{this.renderNotes()}
			</section>
		)
	}

	renderNotes() {
		if (this.props.state === "LOADING") {
			return (<p>Loading ...</p>)
		} else if (this.props.state === "ERROR") {
			return (<p>Error: {this.props.errorMessage}</p>)
		} else if (this.props.state === "LOADED") {
			return (<NotesList notes={this.props.notes} />)
		} else {
			return "Init State"
		}
	}
}

const mapStateToProps = (state: AppState, _ownProps: HomeViewProps) => {
	// TODO: Use state to fill the props of the component
	return {
		...state.list,
	}
}

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
	return {
		loadData: () => dispatch(actionFetchNotes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
