import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { BASE_PROPERTIES, BaseMainElement, BasePanelElement } from './Base'

import { getElementModuleProps } from '../../selectors'
import { setActiveElement, setOverElement } from '../../actions'

export const MODULE_NAME = 'Image'
export const ELEMENT_TYPE = 'Element'

export const PROPERTIES = [].concat(BASE_PROPERTIES, [])

export const ImgPreviewIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAADJCAMAAABypIv1AAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAb1BMVEXT09PU1NTV1dXW1tbX2NfZ2dna2trb29vc3Nze3t3f39/g4ODh4eHi4uLk5OTl5eXm5ubn5+fo6ejq6urr6+vs7Ozt7e3v7+/w8PDx8fHy8vL09PT19fX29vb39/f5+fn6+vr7+/v8/Pz+/v7///+0uytYAAALaElEQVR42u3dC3uiOhMAYJVbuAZUtK2KF/z/v/HLTAIECGq35ysWZp6t9Wy7Z5++O5OEEJJFRvEfxYIIiJIoiZKCKImSKImSgiiJkigpiJIoiZIoKYiSKImSgiiJkiiJkoIoiZIoKYiSKImSKCmIkiiJkoIoiZIoiZKCKImSKCmIcnKU6bMgyv/G8U9pLt4e8s9wLv4E5J/QXPwZybf3XLwNJO/EnxNdvIUkH4g/laWL8SX5o/hDhb94U8nk+57zo3wMmaj4p+wkyjaiFv/gOSPKrmMyxDig+YLnHCn5E8Z/5ZwFpaGyhRR6xfjSRP17Q5ySlBNl2rSQvEKM4m48Sc6hHJ0BpaG4lWMSmyLpYA6SvkVmLkaRbFIyVgnZWEYidMz4Rc/RMcejVCYVWWSIVsk/9ZwRZUsyVZ1NDCmIbqEJM4weNp8dz3EtF78vqY2BsKtR+Rd2Q0/Ph5xvkphjUda1jdmYfl7KO0ZZytdiFwVtz9d69zlR6ilZlXZ+u3ejvJ+Sp9kZGzTHs1z8dlJ2cjISVvvyXrYUZZxjX2ZmS/PB4LNvOX3KVk4GaV3borrhpbzJLD1GfhgEz1vPYctJUhqTMsKkPGE5Z4EW8fYCllng43++rDmq5QiUiV7eUZhAT3MQaD7zA+b74pP4lV4F5Zdf4xq6d/yn6GD2GszpUnbLOwyDDZR2IgU9xpjPMD4E5dWH0LK1P1aKG83aMpkLZZWUSjL4gPIOfCUIlvg2FZS3UORql1MnbZe6qcYnS8lblIARYP99ZL6HjJ4nfolwWSzK/hYBbBOm/OxhTp1S/EwapRyaw/WNQMlF+h0koxYuNKG3+GlOhrLI4SXR83KEEl/8dlLyJicjoRLvoK8+1pCuCg+y8l4cTwMhv1AUhfg4nb42MVpGteUcKJuWUhR3sCtxeH5oO4pw4vL+SpTq1ymVVT5iiS9+udOp6xuyMvpUIAVrOQJlql/4POUUL1kUJdGYlr9Nqfc5wa6COAdC0mlZpvfXAy1vPGp145Om7CalrOHTfpuvVU46ddjBNt9szZHrsdvt8i+80DzwcUt8MUp9Q88b+B9AufXdqpV02mGLD7cbVQ8vB6AYYejzM6Tlrp2WfNqUrfoucBhUdzctR9fW3hs5G0wxPsIpkSP2PJOlTHuU1TRGEMCPnzIXm0mViK1w7F6Cyk8OjOHxItNTliH8s1wGOvGZUCYivRzh0s1LIWlZ4lV8uDZ8wVUJCpae6zCXSUyVlidJ2bKcLiU3UXLmOSw/9uIjshwLUhM+wRuE9FAZ0hI8RW76FSZShpOmzMyUeMkos5K5qWn4+AWSIifxk217ye5wLM7HQ54GqtihvXSr9lJRxpGhwidEaex1gsBHSmGyNg0VC8eSIarc44eyGbGXp4ypSneh99Epx0zLMSgjnVKUamYadh9EXYuwV9YqPVWI1RfPa1di1j35ESmV5Uwo66GQomQDFzZHkFyJD3boQsL7Y2RXIyOi1LOyNGWlhZbxVU1aHPd5lua7g7rRe80cZ4gyHqWxXIzU6zwt8KO1WlqrVXZDyfOa2bLptL31WX7HBi1liUvKYCAtidJarjjm63Ut8lOGvRL9eXbBRN3ItITxpUeUj7qd1XIVXvEtE29ViEwV/ZFoP8GSO+rKhzGiHKY8LVeWU4DY3hbpqbJyiVUvynwPzecldNQVOVE+zsoVeN2/QFF82EGW79aRZS2tpShynDX+rFvLijJs9Tszo/QG20oGRVw4q6WIVVbIUdB5464wL2FQXiaO6sSJ8gGlvYL5zDISSbhcBEWzROscQvdjBdC3HyWlS5Si5xDluTa2lZYLVntsH8PWqsFbjHm5E7i3UM4UDVDyiVGa75FVM0OiOrmJcm9BspY+dDPepX0b5+oDpQe+W1XhknLUfmd0Sp95Xprvd1WoWzaZYx+g88Gk/OxeDX3BpbkNy4qOnux45kupzVeK8bXLXO2ehJxCtxwYU6YwAgr6ORtBWkI23/z5Uvamfn3G3Pb9HZS0QyjnAEZC+/4U3IcYX1oe/A8iohSWFaXv62szJKZjx9AoeqKQrVPvtnd5sWE8BE0oJ8qKMpArr/qJCZffBYwhvbNhZhgpYaiZzZsy1ih9uZxSy0t5n8zaiuw7OuKa0b8aVmM4DaUzU0repVQrU1sr2TAvYUK4cC3LmJWS8iQpnXlnJVhWWaljNnmZwIUNg9nfot9WXmH2UrSV5T3z5l7gbcqWpSOXDkRw2RjYorH86Bf4JwyGXHggIHLmScmHKHuJaTsejithzjdqLf7Dt8lyZa8gb8vQnS9lY4kLXYJgyPIkZ9js3miovBdwAw3n2U5sTpTZE8qgl5g4Q+Fu1BjdXrLOhSP8rmVj2u5fuQbPJk4Z1ZQdy2qIideLe9teilJuW6Y4M4TUcYsy1Cj5dCnTYco2ZlXjeAP8FsKqgiXcwq04rxwlGUwMnez+fOVcKPWOR6Pst5hCCG83HmE5mxhc5mqgftszOYv+Bf134ng4Qp/JfGXW2zBDo8xC9SxOD1Ok2xfYfVi4emjl8jzPt4mHN8wsK8epds+RSdm/TRbD35bOgRIsJWUYBu3MlI/nwcSbvGTMIS9Xcq0GTF/iygKUvEZ29zbZLO449vcnqCjDhtNndYvJPMeRd30+ma2WZqjFL5Yrn63Y2HKdJfOIsqEMe4mJNZ7LjiZx68wUgyMrlgPNvVMts9QXusSzo4w7lH1MbC6lZXlIGU4IW7bl8C950fPhddcMhQMLLCdH2bPsUFaYtSUuUV+rMdDlcwN/cvN1USvbtq7ovR3v0aLAeVGu25sPaJgCSLSCrpsU3U1K8PkzDsMgx/Nmub7STCkfCzdVeTXA9He3ztOO5S33m/XouIR6JpSZadsrEbLA5W4FjSU+PII9ubqKdB1/W5TaxFCRB7bbWvPbX4s+0WX9jyjXco+BaKDGZe8jLmj49rO4iDh9bRPmOF71VJlPlDVltUVgt8jbl+SwwNeTkx3VI7rq6Tz8Nnxup7yozfCS6VN2LbHAo2rHhgoz6iVmNb+hbqN58tG86tkI4egHsFmRuPiZyyNQvY5HFnhcbbdoHmE293Ybz+Z5Ucbg28QHUJ6bJ6DmRAmWMEI8xGGdlwbLetOcSlMa1pK4eU4QMg5X6ydzUk6TspnS4OJnhhsKZa7tAWpoL1kzwaFv+IIX6aqdFJ1+DDcly71xfD55SkjLNT5Ictis6xjoqbS9u3l3l1/YznuHd8qPCW4NPG1KY4WLH/tQdvZZ/H40f/KWhUmURLgV8/S3IdEsOe49ff53Q20PVvk2j+JQ7UrP50OpLEU9Yl7+0FPOdmywoYz627Jl06LMejuic+x5knjzeSl/GvfbacdheB7FY25w99v7Vza7y/OYtzea1ffwNk1x9KK1wx0meTLm/na/TqmVeL1Jf9Sz7IEOMVYjqcS8mcu0KbXLR54Yzo4YTE5DVNvQy1MosC/jk6ccOorDqBkPZ6dh298qrcfe7XcMymqg3expbjzXxHisRNg5H2Fo32Q+3V1VTec/tQ6AiociGgrD5uh8zC2of/c4Dv7A8hFnD9S4yTwfd4/5UU42MVjyl0CN5xsl7yE50nk7rbPJBuMbjNqJHDM4juPBYZhPTsx77vgWJ+6MdsxbdwIt+UG8x9lFI1IaTrv9CePoJ2qNerqo4Uzw74A+PugtmwUlf/VI636+xo/Oxxz39MGxjw/+hua3ThHP5kn5Q8x3Ofb2DU6t/2fQNztAeDHK3/rkWOofIM7oUOvXLH8S2cwo/2+YWTY/yukFURIlURIlBVESJVESJQVREiVRUhAlURIlUVIQJVESJQVREiVREiUFURIlUVIQJVESJVFSECVREiUFURIlURIlBVESJVFSECVREiVRUhAlURIlBVESJVESJcVr8T/gQhzUcCNJJQAAAABJRU5ErkJggg=='

export const defaultScheme = {
  'type': 'Image',
  'styles': {
    'container': {
      'color': '#6E6F7A',
      'lineHeight': '1',
      'padding': '0',
      'width': '100%',
      'height': 'auto'
    },
    'selector': {}
  },
  'data': {
    'src': ImgPreviewIcon,
    'alt': 'alt text',
    'link': ''
  }

}

export const getScheme = (params) => {
  let scheme = {...defaultScheme}

  return JSON.parse(JSON.stringify(scheme))
}

export class MainImageComponent extends BaseMainElement {
  static propTypes = {
    templateIsPreview: PropTypes.bool.isRequired,
    rowIndx: PropTypes.number.isRequired,
    colIndx: PropTypes.number.isRequired,
    elIndx: PropTypes.number.isRequired,
    element: PropTypes.object,
    cssSelectors: PropTypes.object
  }

  static defaultProps = {
    moduleName: MODULE_NAME
  }

  render () {
    const {element, styles} = this.props

    return this._wrap({}, <div style={styles.wrapper}>
      <div>
        <span style={styles.container}>
          <img src={element.data.src} alt={element.data.alt} style={{width: '100%', height: 'auto'}} />
        </span>
      </div>
    </div>)
  }
}

export const MainElement = connect(
  (state, props) => (getElementModuleProps(state, props)),
  (dispatch) => ({
    handleSetActiveElement: (elementId) => (dispatch(setActiveElement(elementId))),
    handleSetOverElement: (elementId) => (dispatch(setOverElement(elementId)))
  })
)(MainImageComponent)

export class PanelElement extends BasePanelElement {
  static defaultProps = {
    moduleName: MODULE_NAME,
    elementType: ELEMENT_TYPE
  }

  static icon = <i className='fa fa-picture-o  fa-4x' />
}
