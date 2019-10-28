/*
 * Color scheme for the site
 */
// const COLORS = {
//   // Sand Color scheme
//   main: '#c2b280',
//   mainShade: '#483f22',
//   mainTint: '#e2dac2',
//   triadicOne: '#80c2b2',
//   triadicOneShade: '#29554a',
//   triadicOneTint: '#c2e2da',
//   triadicTwo: '#b280c2',
//   triadicTwoShade: '#4a2955',
//   triadicTwoTint: '#dac2e2',
// };
const COLORS = {
  sand: {
    main: '#c2b280',
    shade: '#483f22',
    tint: '#e2dac2',
    complementary: {
      main: '#8090c2',
      shade: '#222c48',
      tint: '#c2cae2',
    },
    triadic: {
      first: {main: '#80c2b2', shade: '#22483f', tint: '#c2e2da'},
      second: {main: '#b280c2', shade: '#4a2955', tint: '#dac2e2'},
    },
    splitComplementary: {
      first: {main: '#9180c2', shade: '#2c2248', tint: '#cac2e2'},
      second: {main: '#80b1c2', shade: '#223e48', tint: '#c2dae2'},
    },
    analogous: {
      first: {main: '#c29180', shade: '#482c22', tint: '#e2cac2'},
      second: {main: '#b1c280', shade: '#3e4822', tint: '#dae2c2'},
    },
    tetradic: {
      first: {main: '#c28090', shade: '#48222c', tint: '#e2c2ca'},
      second: {main: '#80c2b2', shade: '#22483f', tint: '#c2e2da'},
      third: {main: '#8090c2', shade: '#222c48', tint: '#c2cae2'},
    },
  },
};

export default COLORS;
