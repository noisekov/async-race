import { level } from "types";

const allLevel: level = {
  1: {
    desk: `<plate1 class="desk__inner plate1 animate right" title="<plate></plate>"></plate1><plate2 class="desk__inner plate2 animate right" title="<plate></plate>"></plate2>`,
    check: `plate`,
    text: `Level 1: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">&lt;div class="desk"&gt;<div class="plate1">&lt;plate /&gt;</div><div class="plate2">&lt;plate /&gt;</div>&lt;/div&gt</div>
      `,
  },
  2: {
    desk: `<plate1 class="desk__inner plate1 right" title="<plate></plate>"></plate1><plate2 class="desk__inner plate2 animate right" title="<plate></plate>"></plate2>`,
    check: `plate`,
    text: `Congratulated you pass first level! <br><br> Level 2: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">&lt;div class="desk"&gt;<div class="plate1">&lt;plate /&gt;</div><div class="plate2">&lt;plate /&gt;</div>&lt;/div&gt</div>
      `,
  },
};

export default allLevel;
