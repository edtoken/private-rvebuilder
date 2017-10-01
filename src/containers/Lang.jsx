import { connect } from 'react-redux'
import LangComponent from '../components/Lang'
import { getLangProps } from '../selectors'

export default connect(
  (state, props) => (getLangProps(state, props)),
  (dispatch) => ({})
)(LangComponent)
