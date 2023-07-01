import { level } from "types";

const allLevel: level = {
  1: {
    desk: `<plate1 class="desk__inner desk__inner--plate plate1 animate right" title="<plate></plate>"></plate1><plate2 class="desk__inner plate2 animate right desk__inner--plate" title="<plate></plate>"></plate2>`,
    check: `plate`,
    text: `Level 1: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">
        &lt;div class="desk"&gt;
          <div class="plate1">&lt;plate /&gt;</div>
          <div class="plate2">&lt;plate /&gt;</div>
        &lt;/div&gt</div>
      `,
  },
  2: {
    desk: `<plate1 class="desk__inner plate1 desk__inner--plate" title="<plate></plate>"></plate1>
    <spoon class="desk__inner spoon desk__inner--spoon right animate" title="<spoon></spoon>"></spoon>
    <plate2 class="desk__inner plate2 desk__inner--plate" title="<plate></plate>"></plate2>`,
    check: `spoon`,
    text: `Congratulated you pass first level! <br><br> Level 2: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">
        &lt;div class="desk"&gt;
          <div class="plate1">&lt;plate /&gt;</div>
          <div class="spoon">&lt;spoon /&gt;</div>
          <div class="plate2">&lt;plate /&gt;</div>
        &lt;/div&gt</div>
      `,
  },
  3: {
    desk: `<spoon class="desk__inner spoon desk__inner--spoon" title="<spoon></spoon>"></spoon>
    <plate3-for-kids class="desk__inner plate3-for-kids desk__inner--plate-for-kids right animate" title="<plate-for-kids></plate-for-kids>"></plate3-for-kids>
    <plate2 class="desk__inner plate2 desk__inner--plate" title="<plate></plate>"></plate2>`,
    check: `#for-kids`,
    text: `Congratulated you pass second level! <br><br> Level 3: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">
        &lt;div class="desk"&gt;
          <div class="spoon">&lt;spoon /&gt;</div>
          <div class="plate3-for-kids">&lt;plate id="for-kids" /&gt;</div>
          <div class="plate2">&lt;plate /&gt;</div>
        &lt;/div&gt</div>
      `,
  },
  4: {
    desk: `<spoon class="desk__inner spoon desk__inner--spoon" title="<spoon></spoon>"></spoon>
    <plate1 class="desk__inner plate1 desk__inner--plate">
      <vegetables class="desk__inner vegetables desk__inner--vegetables right animate" title="<vegetables></vegetables>"></vegetables>
    </plate1>
    <plate2 class="desk__inner plate2 desk__inner--plate" title="<plate></plate>"></plate2>`,
    check: `plate vegetables`,
    text: `Congratulated you pass third level! <br><br> Level 4: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">
        &lt;div class="desk"&gt;
          <div class="spoon">&lt;spoon /&gt;</div>
          <div class="plate1">
            &lt;plate&gt;<br>
              <div class="vegetables">
                &lt;vegetables&gt;
              </div>
            &lt;plate/&gt;
          </div>
          <div class="plate2">&lt;plate /&gt;</div>
        &lt;/div&gt</div>
      `,
  },
  5: {
    desk: `<spoon class="desk__inner spoon desk__inner--spoon" title="<spoon></spoon>"></spoon>
    <plate1 class="desk__inner plate1 desk__inner--plate">
      <vegetables class="desk__inner vegetables desk__inner--vegetables" title="<vegetables></vegetables>"></vegetables>
    </plate1>
    <plate3-for-kids class="desk__inner plate3-for-kids desk__inner--plate-for-kids" title="<plate-for-kids></plate-for-kids>">
      <vegetables-second class="desk__inner right animate vegetables-second desk__inner--kids-vegetables" title="<vegetables></vegetables>"></vegetables-second>
    </plate3-for-kids>`,
    check: `#for-kids vegetables`,
    text: `Congratulated you pass fourth level! <br><br> Level 5: <br> Select all elements which have animation`,
    code: `
        <div class="desk__elements">
        &lt;div class="desk"&gt;
          <div class="spoon">&lt;spoon /&gt;</div>
          <div class="plate1">
            &lt;plate&gt;<br>
              <div class="vegetables">
                &lt;vegetables&gt;
              </div>
            &lt;plate/&gt;
          </div>
          <div class="plate3-for-kids">
            &lt;plate id="for-kids"&gt;<br>
              <div class="vegetables-second">
                &lt;vegetables&gt;
              </div>
            &lt;plate/&gt;
          </div>
        &lt;/div&gt</div>
      `,
  },
};

export default allLevel;
