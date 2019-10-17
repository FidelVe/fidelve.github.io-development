import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';
import styles from './collapse-container.module.css';

const _DATA = graphql`
  {
    expandIcon: file(relativePath: {eq: "ic_add_black_48dp.png"}) {
      childImageSharp {
        fixed(width: 48) {
          width
          height
          src
          base64
        }
      }
    }
    checkWhiteIcon: file(relativePath: {eq: "ic_check_circle_white_48dp.png"}) {
      childImageSharp {
        fixed(width: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const ICON_STYLE = {
  margin: '0px',
  borderRadius: '50%',
};
class CollapseContainer extends React.Component {
  constructor(props) {
    // The ref might not be necessary, I guess I can just delete it?
    // headerText="header for the collapsible container"
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      isOpen: false,
    };
    this.staticState = {
      isInitialRender: true,
      // Computed Height of header and content elements inside the collapsible
      // container
      headerHeight: false,
      contentHeight: false,
      uncollapseHeight: false,
    };
  }

  onHeaderClick = event => {
    this.setState({isOpen: !this.state.isOpen});
  };

  componentDidMount() {
    // Get the updated scroll sizes
    let [headerEl, contentEl] = this.componentRef.current.children;
    console.log(`componentDidMount: ${contentEl.clientHeight}`);

    if (this.staticState.contentHeight !== contentEl.scrollHeight) {
      // console.log(this.staticState.contentHeight, contentEl.scrollHeight);
      // update the header and content height
      this.staticState.contentHeight = contentEl.scrollHeight;
      this.staticState.headerHeight = headerEl.scrollHeight;

      // update the  uncollapsed height. I'm adding 1000px and using
      // max-height instead of height because if I dont the height doesn't
      // updates on resize correctly. In the css file the transition is
      // on max-height instead of height also.
      this.staticState.uncollapseHeight =
        this.staticState.contentHeight + this.staticState.headerHeight + 1000;

      if (this.staticState.isInitialRender) {
        // if this is the initial rendering
        this.staticState.isInitialRender = false;
      }
    }
  }

  render() {
    const elementInlineStyle = this.staticState.isInitialRender
      ? // If this is the first render() am passsing an empty object
        // The initial height is declared in collapse-container.module.css
        // This is to ensure that the containers initial state is collapsed
        {}
      : // If is not the first render() we check if is collapsed or not
      // and adjust the height accordingly
      this.state.isOpen
      ? {maxHeight: `${this.staticState.uncollapseHeight}px`}
      : {maxHeight: `${this.staticState.headerHeight}px`};

    return (
      <StaticQuery
        query={_DATA}
        render={data => {
          return (
            <section
              ref={this.componentRef}
              className={styles.collapseContainer}
              style={elementInlineStyle}>
              <header
                onClick={this.onHeaderClick}
                className={styles.collapseHeader}>
                <h3>{this.props.headerText}</h3>
                <Img
                  imgStyle={ICON_STYLE}
                  className={styles.collapseHeaderImgWrapper}
                  fixed={data.expandIcon.childImageSharp.fixed}
                />
              </header>
              <article className={styles.collapseContent}>
                {this.props.children}
              </article>
            </section>
          );
        }}
      />
    );
  }
}

CollapseContainer.defaultProps = {
  headerText: 'default value for the header text',
};

export default CollapseContainer;
