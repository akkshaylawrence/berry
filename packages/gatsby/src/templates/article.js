import {graphql}             from 'gatsby';
import React                 from 'react';

import {LayoutContentNav}    from '../components/layout-content-nav';
import {PrerenderedMarkdown} from '../components/markdown';
import {SEO}                 from '../components/seo';
import { Global, css }       from '@emotion/core';

const GlobalStyleOverrides = css`
:root {
  --header-border-bottom: 1px solid #cfdee9;
}
`;

// eslint-disable-next-line arca/no-default-export
export default function Template({data, pageContext: {category}}) {
  const {allMarkdownRemark, markdownRemark} = data;
  const {frontmatter, html} = markdownRemark;

  return <>
    <Global styles={GlobalStyleOverrides} />
    <LayoutContentNav items={allMarkdownRemark.edges.map(({node}) => ({
      to: node.frontmatter.path,
      name: node.frontmatter.title,
    }))}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={[`package manager`, `yarn`, `yarnpkg`, frontmatter.path.split(`/`).reverse()[0]]}
      />
      <PrerenderedMarkdown title={frontmatter.title}>
        {html}
      </PrerenderedMarkdown>
    </LayoutContentNav>
  </>;
}

export const pageQuery = graphql`
  query($path: String!, $category: String) {
    allMarkdownRemark(
      filter: {frontmatter: {category: {eq: $category}, hidden: {ne: true}}}
      sort: {order: ASC, fields: [frontmatter___title]}
    ) {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
    markdownRemark(frontmatter: {category: {eq: $category}, path: {eq: $path}}) {
      html
      frontmatter {
        path
        title
        description
      }
    }
  }
`;
