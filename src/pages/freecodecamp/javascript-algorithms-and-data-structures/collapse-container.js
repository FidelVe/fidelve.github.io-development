import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';
import styles from './collapse-container.module.css';
import {Helmet} from 'react-helmet';

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
    // headerText="header for the collapsible container"
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <StaticQuery
        query={_DATA}
        render={data => {
          // console.log(data);
          return (
            <section className={styles.collapseContainer}>
              <Helmet>
                <title>FidelVe | FreeCodeCamp</title>
              </Helmet>
              <header className={styles.collapseHeader}>
                <h3>{this.props.headerText}</h3>
                <Img
                  imgStyle={ICON_STYLE}
                  className={styles.collapseHeaderImgWrapper}
                  // placeholderClassName={styles.collapseHeaderImg}
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

// export const iconImg = graphql`
//   fragment iconImg on File {
//     childImageSharp {
//       fixed(width: 48) {
//         ...GatsbyImageSharpFixed
//       }
//     }
//   }
// `;

export default CollapseContainer;
