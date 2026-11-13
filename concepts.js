'use strict';
// LEARN's concept guide: for each lesson, a picture of what it does to the data (a table before → after, or a small
// chart for the Tableau ideas that are about the view) and three lines: what it does, how to write it, and the usual
// mistake. A picture sits beside the lesson in today's session and the lesson list; the ⓘ by a lesson's title opens
// the guide. Lessons share pictures through their family (F below); G maps each lesson to its family and words.
window.CPG=(()=>{
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
  // a cell: '' plain, a the result, b soft (an input that matters), x dropped, h missing, 1 2 3 a group's colour,
  // n nothing (no cell). With text: {c, t}
  const T=(t,c='')=>({t,c}),r3=['','',''],x3=['x','x','x'];
  // a family: L → R, with A (a second input under L, joined with +) or M (a step in between); cw: a cell's width
  const F={
    filter:{L:[r3,x3,r3,x3,r3],R:[r3,r3,r3]},
    top:{L:[[T(5)],[T(9)],[T(2)],[T(7)],[T(4)]],R:[[T(9,'a')],[T(7,'a')]]},
    group:{L:[['1',T(4)],['2',T(3)],['1',T(2)],['3',T(5)],['2',T(1)]],R:[['1',T(6,'a')],['2',T(4,'a')],['3',T(5,'a')]]},
    count:{L:[['1'],['2'],['1'],['1'],['3'],['2']],R:[['1',T(3,'a')],['2',T(2,'a')],['3',T(1,'a')]]},
    distinct:{L:[['1'],['2'],['1'],['2'],['3']],R:[['1'],['2'],['3']]},
    nulls:{L:[[T(5)],['h'],[T(7)],['h']],R:[[T(5)],[T(0,'a')],[T(7)],[T(0,'a')]]},
    text:{L:[[T('NQZ6')],[T('ESH7')]],R:[[T('NQ','a')],[T('ES','a')]],cw:{L:46}},
    join:{L:[['1',''],['2',''],['3','']],A:[['1','b'],['2','b'],['3','b']],R:[['1','','b'],['2','','b'],['3','','b']]},
    semi:{L:[['1',''],['2',''],['3','']],A:[['1'],['1'],['3']],R:[['1',''],['3','']]},
    left:{L:[['1',''],['2',''],['3','']],A:[['1','b'],['3','b']],R:[['1','','b'],['2','','h'],['3','','b']]},
    anti:{L:[['1',''],['2',''],['3','']],A:[['1'],['3']],R:[['2','a']]},
    having:{L:[['1'],['2'],['1'],['3'],['1']],R:[['1',T(3,'a')],['x',T(1,'x')],['x',T(1,'x')]]},
    label:{L:[[T(9)],[T(4)],[T(7)]],R:[[T(9),T('hi','1')],[T(4),T('lo','3')],[T(7),T('mid','2')]]},
    stack:{L:[['1','1'],['1','1']],A:[['2','2'],['2','2']],R:[['1','1'],['1','1'],['2','2'],['2','2']]},
    datediff:{L:[[T('9:30'),T('9:42')],[T('10:05'),T('10:08')]],R:[[T(12,'a')],[T(3,'a')]],cw:{L:44}},
    chain:{L:[['1'],['2'],['1'],['2']],M:[['1',T(5,'b')],['2',T(3,'b')]],R:[['1',T(5,'a')]]},
    self:{L:[[T(1)],[T(2)],[T(3)]],R:[[T(1),T(2,'a')],[T(2),T(3,'a')]]},
    rank:{L:[[T(40)],[T(90)],[T(70)]],R:[[T(40),T(3,'a')],[T(90),T(1,'a')],[T(70),T(2,'a')]]},
    gtotal:{L:[['1',T(2)],['1',T(3)],['2',T(4)],['2',T(2)]],R:[['1',T(2),T(5,'a')],['1',T(3),T(5,'a')],['2',T(4),T(6,'a')],['2',T(2),T(6,'a')]]},
    lag:{L:[[T(5)],[T(7)],[T(6)],[T(9)]],R:[[T(5),'h'],[T(7),T(5,'a')],[T(6),T(7,'a')],[T(9),T(6,'a')]]},
    running:{L:[[T(3)],[T(5)],[T(2)],[T(4)]],R:[[T(3),T(3,'a')],[T(5),T(8,'a')],[T(2),T(10,'a')],[T(4),T(14,'a')]]},
    moving:{L:[[T(4)],[T(8)],[T(6)],[T(2)]],R:[[T(4),T(4,'a')],[T(8),T(6,'a')],[T(6),T(6,'a')],[T(2),T(5,'a')]]},
    latest:{L:[['1',T('old')],['1',T('new','b')],['2',T('old')],['2',T('new','b')]],R:[['1',T('new','a')],['2',T('new','a')]]},
    median:{L:[[T(2)],[T(4)],[T(5,'b')],[T(7)],[T(30)]],R:[[T(5,'a')]]},
    cohort:{L:[['1'],['1'],['2'],['2'],['3']],R:[['1','a','b','b'],['2','a','b','n'],['3','a','n','n']]},
    streak:{L:[['a','a','x','a','a','a']],R:[[T(2,'a')],[T(3,'a')]],cw:{L:16}},
    pivot:{L:[['1','2',T(3)],['1','3',T(1)],['2','2',T(4)],['2','3',T(2)]],R:[['1',T(3,'2'),T(1,'3')],['2',T(4,'2'),T(2,'3')]]},
    melt:{L:[['1',T(3,'2'),T(1,'3')],['2',T(4,'2'),T(2,'3')]],R:[['1','2',T(3)],['1','3',T(1)],['2','2',T(4)],['2','3',T(2)]]},
    topn:{L:[['1',T(9)],['1',T(5)],['1',T(7)],['2',T(3)],['2',T(8)]],R:[['1',T(9,'a')],['1',T(7,'a')],['2',T(8,'a')],['2',T(3,'a')]]},
    json:{L:[[T('{ }','b')],[T('{ }','b')]],R:[r3,r3]},
    regex:{L:[[T('log line')],[T('log line')]],R:[[T('day','a'),T('app','a'),T('n','a')],[T('day','a'),T('app','a'),T('n','a')]],cw:{L:62}},
    calgap:{L:[[T('Mon'),T(2)],[T('Tue'),T(1)],[T('Thu'),T(3)]],R:[[T('Mon'),T(2)],[T('Tue'),T(1)],[T('Wed','a'),T(0,'a')],[T('Thu'),T(3)]],cw:{L:38,R:38}},
    save:{L:[['x','x'],['x','x']],M:[['',''],['','']],R:[['a','a'],['a','a']]},
    load:{L:[[T('.csv','b')]],R:[r3,r3,r3],cw:{L:44}},
    crosstab:{L:[['1','2'],['1','3'],['2','2'],['1','2']],R:[[T(2,'a'),T(1,'a')],[T(1,'a'),T(0,'a')]]},
    fill:{L:[[T(70)],['h'],['h'],[T(71)]],R:[[T(70)],[T(70,'a')],[T(70,'a')],[T(71)]]},
    arrays:{L:[['h',T(5),'h'],[T(2),'h',T(4)]],R:[[T(0,'a'),T(5),T(0,'a')],[T(2),T(0,'a'),T(4)]]},
    macro:{L:[[T('%','b')]],R:[['1','1'],['2','2'],['3','3']]},
    into:{L:[[T('SQL')],[T('Py')],[T('SAS')]],R:[[T('&list','a')]],cw:{L:38,R:54}},
    passthru:{L:[[T('SQL','b')]],M:[['','','',''],['','','',''],['','','',''],['','','','']],R:[['a','a']],cw:{L:38}},
    excel:{L:[r3,r3],R:[['a','a','a'],r3,r3]},
    extract:{L:[['','','',''],['','','',''],['','','',''],['','','','']],R:[['a','a'],['a','a'],['a','a']]},
    rowagg:{L:[['','b'],['','b'],['','b']],R:[[T('Σ','a')]]},
    sets:{L:[[T('A')],[T('B')],[T('C')],[T('D')]],R:[[T('A','a')],[T('B','x')],[T('C','a')],[T('D','x')]]},
    filtercalc:{L:[[T('40%')],[T('25%')],[T('20%')],[T('15%')]],R:[[T('40%','a')],[T('25%','a')],[T('20%','a')]],cw:{L:40,R:40}},
    rls:{L:[['1',''],['2',''],['1',''],['2','']],R:[['1',''],['1','']]},
    dates:{L:[[T('11-03')],[T('11-05')],[T('11-12')]],R:[[T('W45','a')],[T('W45','a')],[T('W46','a')]],cw:{L:44,R:38}},
    derive:{L:[['',''],['',''],['','']],R:[['','','a'],['','','a'],['','','a']]}
  };
  // ---------- tables ----------
  const cls=c=>'cp-c'+(c||'0');
  const grid=(rows,x0,y0,cw,ch,g,txt)=>rows.map((r,i)=>r.map((c,j)=>{const o=typeof c==='object'?c:{c};if(o.c==='n')return '';
    const x=x0+j*(cw+g),y=y0+i*(ch+g);
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cw}" height="${ch}" rx="${txt?3:1}" class="${cls(o.c)}"/>${txt&&o.t!=null?`<text x="${(x+cw/2).toFixed(1)}" y="${(y+ch/2+4).toFixed(1)}" class="cp-t${/^[a123]$/.test(o.c)?' cp-on':''}">${esc(o.t)}</text>`:''}`}).join('')).join('');
  const dims=(rows,cw,ch,g)=>[rows[0].length*(cw+g)-g,rows.length*(ch+g)-g];
  const table=(f,op,big)=>{
    const S=big?{cw:34,ch:24,g:4,arr:52,plus:18}:{cw:5.6,ch:4.2,g:1.2,arr:11,plus:3},W=k=>big?f.cw?.[k]||S.cw:(f.cw?.[k]||S.cw*6)/6;
    let x=0,H=0;
    // the left side: L, and A under it with a +
    const [lw,lh]=dims(f.L,W('L'),S.ch,S.g),[aw,ah]=f.A?dims(f.A,W('L'),S.ch,S.g):[0,0],left=Math.max(lw,aw),lH=lh+(f.A?S.plus+ah:0);
    H=Math.max(H,lH);
    const seg=[{w:left,h:lH,draw:(x0,y0)=>grid(f.L,x0,y0,W('L'),S.ch,S.g,big)+(f.A?`<text x="${x0+left/2}" y="${y0+lh+S.plus*.75}" class="cp-plus">+</text>`+grid(f.A,x0,y0+lh+S.plus,W('L'),S.ch,S.g,big):'')}];
    if(f.M){const [mw,mh]=dims(f.M,W('M'),S.ch,S.g);H=Math.max(H,mh);seg.push({arrow:1,op},{w:mw,h:mh,draw:(x0,y0)=>grid(f.M,x0,y0,W('M'),S.ch,S.g,big)})}
    const [rw,rh]=dims(f.R,W('R'),S.ch,S.g);H=Math.max(H,rh);seg.push({arrow:1,op:f.M?'':op},{w:rw,h:rh,draw:(x0,y0)=>grid(f.R,x0,y0,W('R'),S.ch,S.g,big)});
    const top=big?18:1;H+=top+(big?4:1);let out='';
    for(const s of seg){if(s.arrow){const y=top+(H-top)/2;out+=`<path d="M${x+S.arr*.18} ${y}h${S.arr*.64}m-${big?6:2.4} -${big?5:2.2} ${big?6:2.4} ${big?5:2.2} -${big?6:2.4} ${big?5:2.2}" class="cp-ar"/>`+(big&&s.op?`<text x="${x+S.arr/2}" y="${y-10}" class="cp-op">${esc(s.op)}</text>`:'');x+=S.arr}
      else{out+=s.draw(x,top+(H-top-s.h)/2);x+=s.w}}
    return big?`<svg class="cp-svg" viewBox="${big?-2:0} 0 ${x+4} ${H}" style="width:min(100%,${Math.round((x+4)*1.15)}px)" aria-hidden="true">${out}</svg>`
      :`<svg class="cp-svg" viewBox="0 0 ${x} ${H}" aria-hidden="true">${out}</svg>`;
  };
  // ---------- small charts, for the Tableau ideas about the view (300 × 110) ----------
  const bars=(xs,ys,w,cl='cp-bar')=>xs.map((x,i)=>`<rect x="${x}" y="${100-ys[i]}" width="${w}" height="${ys[i]}" rx="2" class="${cl}"/>`).join('');
  const lbl=(x,y,t,big,c='cp-op')=>big?`<text x="${x}" y="${y}" class="${c}">${esc(t)}</text>`:'';
  const C={
    disc:big=>bars([16,58,100],[50,78,36],34,'cp-bar cp-blue')+lbl(66,16,'discrete: headers',big)+`<line x1="170" x2="292" y1="100" y2="100" class="cp-axis"/><path d="M172 80L196 62 220 70 244 40 268 48 290 24" class="cp-line cp-green"/>`+lbl(232,16,'continuous: an axis',big),
    marks:big=>`<circle cx="50" cy="60" r="9" class="cp-dot"/><circle cx="90" cy="44" r="9" class="cp-dot"/>${lbl(70,16,'1 mark per kind',big)}<path d="M125 58h40m-6 -5 6 5 -6 5" class="cp-ar"/>${lbl(145,46,'+ Detail',big)}`+
      [[190,70],[202,50],[214,62],[226,40],[238,74],[250,52],[262,36],[274,64],[286,46],[208,82],[244,88],[280,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" class="cp-dot"/>`).join('')+lbl(240,16,'1 per day',big),
    rel:big=>grid([['',''],['',''],['','']],20,26,30,18,4,big)+grid([['',''],['','']],206,36,30,18,4,big)+`<path d="M90 50C140 50 150 58 200 58" class="cp-noodle"/>`+lbl(148,24,'matched on Day',big),
    dual:big=>bars([20,62,104,146,188,230],[40,62,30,70,54,46],30,'cp-bar cp-soft')+`<path d="M35 64L77 40 119 74 161 30 203 50 245 58" class="cp-line"/><line x1="10" x2="10" y1="10" y2="100" class="cp-axis"/><line x1="282" x2="282" y1="10" y2="100" class="cp-axis"/>`,
    ref:big=>bars([20,62,104,146,188,230],[34,56,40,66,50,74],30,'cp-bar cp-soft')+`<line x1="12" x2="272" y1="46" y2="46" class="cp-refl"/><path d="M20 76L270 30" class="cp-line"/>`+lbl(284,50,'avg',big,'cp-op cp-end'),
    dash:big=>[[10,8],[160,8],[10,60],[160,60]].map(([x,y])=>`<rect x="${x}" y="${y}" width="130" height="46" rx="5" class="cp-tile"/>`).join('')+
      [[24,22],[52,34],[80,14],[108,28]].map(([x,h])=>`<rect x="${x}" y="${50-h}" width="20" height="${h}" rx="2" class="cp-bar${x===52?'':' cp-soft'}"/>`).join('')+
      [[176,18],[204,30],[232,22]].map(([x,h])=>`<rect x="${x}" y="${50-h}" width="20" height="${h}" rx="2" class="cp-bar"/>`).join('')+
      [[24,14],[52,22],[80,18],[108,26],[176,20],[204,12],[232,26],[260,16]].map(([x,h])=>`<rect x="${x}" y="${102-h}" width="20" height="${h}" rx="2" class="cp-bar cp-soft"/>`).join('')+
      `<path d="M143 31h14m-5 -4 5 4 -5 4" class="cp-ar"/>`,
    param:big=>`<rect x="20" y="10" width="120" height="26" rx="5" class="cp-tile"/>${lbl(72,28,'Short',big)}<path d="M122 20l6 6 6-6" class="cp-ar"/>`+bars([170,200,230,260],[30,52,40,64],22,'cp-bar cp-soft')+`<rect x="200" y="48" width="22" height="52" rx="2" class="cp-bar"/><rect x="260" y="36" width="22" height="64" rx="2" class="cp-bar"/><path d="M146 24C176 24 186 36 196 44" class="cp-noodle"/>`,
    runline:big=>bars([20,62,104,146,188,230],[30,20,36,16,28,24],30,'cp-bar cp-soft')+`<path d="M35 92L77 80 119 60 161 52 203 36 245 22" class="cp-line"/>`+lbl(262,18,'running sum',big,'cp-op cp-end'),
    funnel:big=>['extract','data source','context','dimension','measure'].map((t,i)=>`<rect x="${20+i*14}" y="${8+i*20}" width="${260-i*28}" height="15" rx="3" class="${i===2?'cp-bar':'cp-bar cp-soft'}"/>${lbl(150,19+i*20,`${i+1} ${t}`,big,'cp-op cp-in'+(i===2?' cp-on':''))}`).join(''),
    perf:big=>[[10,40,'cp-soft'],[50,120,''],[170,30,'cp-soft'],[200,60,'cp-soft']].map(([x,w,c],i)=>`<rect x="${x}" y="${20+i*20}" width="${w}" height="14" rx="3" class="cp-bar ${c}"/>`).join('')+`<line x1="10" x2="290" y1="102" y2="102" class="cp-axis"/>`+lbl(110,51,'slowest query',big,'cp-op cp-on')
  };
  const chart=(k,big)=>`<svg class="cp-svg cp-ch" viewBox="0 ${k==='dash'?4:0} 300 ${k==='dash'?120:110}"${big?' style="width:min(100%,330px)"':''} aria-hidden="true">${C[k](big)}</svg>`;
  // ---------- the lessons: id: [family, the operation over the arrow, does, write, watch for] ----------
  const G={
    sql1:['filter','WHERE','Keeps only the rows that match a condition, and only the columns you name.',"SELECT day, minutes FROM mind WHERE minutes >= 20",'AND binds tighter than OR: put an OR pair in brackets. Text goes in single quotes.'],
    sql2:['top','ORDER BY','Sorts the rows, then keeps the first few.','ORDER BY kcal DESC LIMIT 5','Without ORDER BY the order isn’t guaranteed. Add a tiebreaker (like id) so LIMIT always keeps the same rows.'],
    sql3:['group','GROUP BY','Collapses the rows into one per group and adds them up.','SELECT kind, COUNT(*), SUM(kcal) FROM meals GROUP BY kind','Every column you select must be in GROUP BY or inside an aggregate. COUNT(col) skips NULLs; COUNT(*) doesn’t.'],
    sql13:['distinct','DISTINCT','Keeps each different value, or combination of values, once.','SELECT COUNT(DISTINCT technique) FROM mind','DISTINCT applies to the whole row of selected columns, not just the first one.'],
    sql14:['nulls','COALESCE','Finds missing values and swaps in a fallback.','WHERE depth IS NULL · COALESCE(depth, 0)','= NULL never matches: use IS NULL. AVG skips NULLs, so a fallback of 0 changes the average.'],
    sql15:['text','SUBSTR','Cuts and matches text: a piece of a string, or a pattern.',"SUBSTR(time, 12, 5) · name LIKE 'Bench%'",'SUBSTR counts from 1, not 0. In LIKE, % matches any run of characters and _ exactly one.'],
    sql4:['join','JOIN','Puts the rows of two tables side by side where their keys match.','FROM study s JOIN checkins c ON c.day = s.day','A key that repeats on both sides multiplies rows. An inner join drops rows with no match.'],
    sql16:['semi','EXISTS','Keeps the rows that have a match in another table, without bringing the match’s rows in.','WHERE EXISTS (SELECT 1 FROM habits h WHERE h.day = m.day)','A JOIN here repeats a row once per match and inflates counts; EXISTS only checks that one exists.'],
    sql5:['having','HAVING','Filters the groups after GROUP BY, using their totals.','GROUP BY exercise HAVING COUNT(*) >= 5','WHERE filters rows before grouping, HAVING filters groups after. Row conditions belong in WHERE.'],
    sql6:['label','CASE','Turns values into labels, checking each condition in order.',"CASE WHEN rpe >= 8.5 THEN 'hard' ELSE 'easy' END",'The first true WHEN wins, so put the strictest first. Without ELSE, no match gives NULL.'],
    sql17:['stack','UNION ALL','Stacks the rows of two queries into one list.',"SELECT time, 'MIND' FROM mind UNION ALL SELECT time, 'REWIRE' FROM habits",'Both sides need the same number of columns in the same order. UNION without ALL also drops duplicates.'],
    sql18:['datediff','julianday','Turns two timestamps into the time between them.','(julianday(closed) - julianday(opened)) * 1440','julianday counts days: × 24 for hours, × 1440 for minutes. The dates must be ISO text (YYYY-MM-DD).'],
    sql7:['chain','WITH','Builds a query in named steps, each one reading the step before.','WITH per_track AS (SELECT …) SELECT … FROM per_track','A CTE only exists for the query that follows it. Name each step for what it holds.'],
    sql8:['left','LEFT JOIN','Keeps every row on the left, with its match when there is one; WHERE the right side IS NULL keeps only the rows without.','LEFT JOIN mind m ON m.day = s.day WHERE m.id IS NULL','A condition on the right table in WHERE turns it back into an inner join: put it in ON. COUNT(m.id) gives 0, COUNT(*) 1.'],
    sql19:['self','JOIN itself','Joins a table to itself, to pair each row with another: an urge with what came after it.','FROM habits a JOIN habits b ON b.time > a.time AND …','Give each copy its own alias. A range condition can match many rows: bound it.'],
    sql9:['rank','RANK()','Numbers the rows inside each group in an order you choose, without collapsing them.','RANK() OVER (PARTITION BY practice ORDER BY minutes DESC)','Ties: RANK skips numbers (1, 1, 3), DENSE_RANK doesn’t (1, 1, 2), ROW_NUMBER never ties.'],
    sql20:['gtotal','SUM() OVER','Puts a group’s total on every row, so each row can be a share of it.','kcal * 100.0 / SUM(kcal) OVER (PARTITION BY day)','Whole number ÷ whole number rounds down in many databases: multiply by 100.0 first.'],
    sql21:['lag','LAG()','Puts the previous row’s value beside each row, to compare a day with the day before. LEAD looks one row ahead.','LAG(minutes) OVER (PARTITION BY track ORDER BY time)','The first row has no previous one: it comes back NULL. Always give the window an ORDER BY.'],
    sql10:['running','SUM() OVER','Adds each row to everything before it: a total so far.','SUM(sleep - 8) OVER (ORDER BY day)','Order by something unique, or tied rows are added in at the same time.'],
    sql22:['moving','ROWS','Averages each row with a fixed number of rows before it.','AVG(minutes) OVER (ORDER BY time ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)','The first rows average fewer values. ROWS counts rows, not days: a missing day isn’t a gap.'],
    sql11:['latest','ROW_NUMBER','Keeps one row per key: the newest.','ROW_NUMBER() OVER (PARTITION BY exercise ORDER BY time DESC) = 1','WHERE can’t see a window function: number the rows in a CTE, then filter outside it.'],
    sql23:['median','NTILE(4)','Finds the middle value, and splits the rows into equal quarters.','NTILE(4) OVER (ORDER BY minutes)','An average is pulled by outliers, the median isn’t. With an even count the median sits between two values.'],
    sql12:['cohort','cohort','Groups by the week something started, then counts how many are still going each week after.',"date(MIN(day), '-6 days', 'weekday 1')",'Measure each cohort against its own size. The newest cohorts have had fewer weeks to show.'],
    sql24:['streak','day − n','Finds runs of consecutive days: the day minus its row number stays the same all through a run.','julianday(day) - ROW_NUMBER() OVER (ORDER BY day)','One row per day first: duplicates break the run.'],
    py1:['filter','df[mask]','Keeps the rows where a condition is true.','trades[(trades["pnl"] < 0) & (trades["side"] == "Short")]','Use & and | with each condition in its own brackets; and / or raise an error.'],
    py2:['top','sort_values','Sorts the rows, then keeps the first few.','trades.sort_values("pnl", ascending=False).head(5)','sort_values returns a new table: assign it. Add a tiebreaker column for a stable order.'],
    py12:['derive','vectorized','Computes a whole column at once from other columns.','w["volume"] = w["sets"] * w["reps"] * w["load"]','Math with a missing value gives NaN. Work on a .copy() of a slice, or pandas warns you.'],
    py3:['group','groupby','One row per group, with a column summed, averaged or counted.','meals.groupby("kind", as_index=False)["kcal"].sum()','Without as_index=False the group becomes the index. .size() counts rows, .count() counts non-missing values.'],
    py13:['count','value_counts','Counts the rows for each value, most frequent first.','workouts["type"].value_counts() · .nunique()','Missing values aren’t counted unless you pass dropna=False.'],
    py14:['nulls','isna','Finds the gaps, column by column.','checkins.isna().sum() · w.count()','.count() is the values present, .size is every row. mean() skips NaN without telling you.'],
    py4:['join','merge','Joins two tables side by side on a shared column.','pd.merge(protein, morning, on="day", how="left")','Check the row count after: a key repeated on both sides multiplies rows. validate="one_to_one" catches it.'],
    py15:['stack','concat','Stacks tables on top of each other.','pd.concat([a, b], ignore_index=True)','Columns line up by name; one missing on a side fills with NaN. ignore_index avoids repeated row labels.'],
    py5:['pivot','pivot_table','Turns one column’s values into columns, adding up what lands in each cell.','pivot_table(index="contract", columns="side", values="pnl", aggfunc="sum")','aggfunc defaults to the mean, not the sum. Empty cells are NaN unless you set fill_value=0.'],
    py16:['melt','melt','Turns columns into rows: one row per value, with the old column’s name beside it.','checkins.melt(id_vars="day", value_vars=["quality", "energy"])','id_vars stay as they are; every column in value_vars becomes rows.'],
    py6:['label','np.where','Picks one of two values on every row from a condition; nest them for more.','np.where(m < 5, "quick", np.where(m < 15, "medium", "long"))','Nested where’s read as if / elif / else, in order. For even buckets, pd.cut is simpler.'],
    py17:['text','.str','Runs a text operation on every value of a column.','t["contract"].str[:2] · .str.contains("NQ")','Missing values give NaN: pass na=False to contains when you filter with it.'],
    py7:['dates','.dt','Turns text into dates, then dates into months or weeks to group by.','pd.to_datetime(s["day"]).dt.to_period("W")','Convert first: a text column has no .dt. Weeks can start on Monday or Sunday: pick one.'],
    py18:['anti','~isin','Keeps the rows with no match in another table.','meal_days[~meal_days["day"].isin(checkins["day"])]','For several key columns, merge with indicator=True and keep "left_only".'],
    py8:['topn','head per group','Keeps the best few rows of each group.','t.sort_values(…).groupby("contract").head(3)','Sort before grouping: head takes the rows in their current order.'],
    py19:['lag','shift','Brings the previous row’s value alongside, for the change since then.','m.groupby("practice")["minutes"].shift() · .diff()','Sort first. Each group’s first row has no previous one: NaN.'],
    py20:['gtotal','transform','Computes a group’s total or mean and puts it on every row of the group.','m.groupby("practice")["minutes"].transform("mean")','agg gives one row per group; transform keeps every row, so a row can be compared with its group.'],
    py9:['json','json_normalize','Turns nested records into a flat table, one column per field.','pd.json_normalize(day_export)','Nested fields get dotted names (checkin.sleep). A list inside a record needs record_path.'],
    py10:['regex','str.extract','Pulls named pieces out of text with a pattern, one column per piece.','u.str.extract(r"^(?P<day>\\S+) (?P<app>\\w+)")','Lines that don’t match give NaN. Write the pattern as a raw string, r"…", so the backslashes stay.'],
    py11:['latest','drop_duplicates','Keeps one row per key: the latest.','c.sort_values("day").drop_duplicates("week", keep="last")','Sort first: keep="last" means last in the current order, not the latest date.'],
    py21:['running','cumsum','Adds each row to the ones before it; the drawdown is how far it sits below its best so far.','s["minutes"].cumsum() · x - x.cummax()','Sort by time first. For one total per group: groupby(…)["minutes"].cumsum().'],
    py22:['calgap','resample','Adds the missing days, so every day has a row, with 0 where nothing happened.','m.resample("D").size()','resample needs a date index. size() fills empty days with 0; mean() leaves NaN.'],
    py23:['moving','rolling','Averages each row with the ones just before it.','c["energy"].rolling("7D").mean()','rolling(7) is 7 rows; rolling("7D") is 7 days of time, gaps included, and needs a date index.'],
    py24:['streak','cumsum','Labels each run of the same result, then measures the runs.','(t["result"] != t["result"].shift()).cumsum()','Sort first. A new run starts wherever the value changes.'],
    sas1:['filter','DATA','Reads a data set one row at a time and writes the rows you keep to a new one.',"data short_losses; set work.trades; if pnl < 0 and side = 'Short'; run;",'Each statement runs once per row, top to bottom. End every step with run;.'],
    sas9:['save','LIBNAME','WORK is wiped when the session ends; a library you name points to a folder that keeps the data.','libname isx "~/isionlogs"; data isx.trades; set work.trades; run;','The folder must exist first. A one-part name (trades) means WORK.trades.'],
    sas10:['load','IMPORT','Reads a CSV file or an Excel sheet into a data set.','proc import datafile="study.xlsx" out=work.study dbms=xlsx replace;','It guesses each column’s type from the first rows: GUESSINGROWS=MAX for a CSV. REPLACE overwrites.'],
    sas2:['top','SORT','Sorts into a copy, then prints its first rows.','proc sort data=work.trades out=best; by descending pnl; run; proc print data=best(obs=5);','Without OUT= the sort replaces the original. DESCENDING goes before the column it applies to.'],
    sas11:['label','IF-THEN','Sets a new column from conditions, row by row.',"length night $ 6; if sleep < 6 then night = 'short'; else night = 'ok';",'Set LENGTH before the first value, or longer labels are cut to the first one’s length.'],
    sas12:['crosstab','FREQ','Counts the rows per value, or per pair of values in a crosstab.','proc freq data=work.trades; tables contract*side; run;','Missing values are left out unless you add / missing. ORDER=FREQ puts the biggest first.'],
    sas13:['filter','WHERE / IF','Both keep rows: WHERE before a row is read, IF after it, so IF can test a column you just made.',"where type = 'Weighted'; volume = sets*reps*load; if volume > 5000;",'WHERE can’t see a column made in the same step; IF can. WHERE is faster on big data.'],
    sas3:['group','PROC SQL','Runs SQL inside SAS: CREATE TABLE saves the result, a plain SELECT prints it.','proc sql; create table c as select contract, sum(pnl) from work.trades group by contract; quit;','End it with quit;, not run;.'],
    sas14:['nulls','missing','A missing number is a dot, missing text a blank; most functions skip them.','if missing(mood_after) then … · n(a, b)','Missing sorts below every number, so if x < 5 is true when x is missing: test missing() first.'],
    sas15:['text','SCAN','Cuts and joins text: SUBSTR by position, SCAN by word, CATX with a separator.',"first_word = scan(technique, 1, ' ');",'Give a new text column a LENGTH, or it inherits one that may cut the values.'],
    sas16:['dates','INPUT','Turns date text into a SAS date (a count of days), then shows it with a format.','d = input(day, yymmdd10.); format d date9.;','A date is a number: without a format it prints as 23652. An informat reads, a format shows.'],
    sas4:['join','MERGE','Joins sorted data sets row by row on a key; IN= says which side each row came from.','data both; merge m(in=a) c(in=b); by day; if a and b; run;','Sort both BY the key first. A key repeated on both sides pairs rows in order instead of multiplying them like SQL.'],
    sas17:['fill','RETAIN','Keeps a value from one row to the next: the last weigh-in carried over the mornings you skipped.','retain last_w; if not missing(weight) then last_w = weight;','Without RETAIN every row starts the column as missing. The sum statement (total + x;) retains on its own.'],
    sas5:['group','MEANS','Summary statistics per group: count, mean, min, max.','proc means data=work.checkins n mean min max; class quality; var energy; run;','CLASS needs no sorting; BY does. Add NWAY to OUTPUT to keep only the full-group rows.'],
    sas18:['label','FORMAT','Defines your own buckets once, then shows any column through them without a new column.',"value intf low-<4 = 'mild' 4-<7 = 'medium' 7-high = 'strong';",'Ranges must not overlap; -< leaves out the top end. PROC FREQ then counts by bucket.'],
    sas6:['latest','LAST.','In data sorted by a group, flags the first and last row of each group.','by exercise; if last.exercise;','Needs BY, with the data sorted the same way. Sort by load inside the group to make the last row the heaviest.'],
    sas19:['lag','LAG','Gives the previous row’s value; DIF the change from it.','prev = lag(energy); change = dif(energy);','LAG returns the value from the last time it ran: never call it inside an IF.'],
    sas20:['dates','INTNX','INTNX moves a date to the start or end of its month or week; INTCK counts the intervals between two dates.',"intnx('month', d, 0, 'end') · intck('day', slip, today())",'INTCK counts boundaries crossed: from Jan 31 to Feb 1 is one month.'],
    sas21:['pivot','TRANSPOSE','Turns rows into columns: one row per month, one column per track.','proc transpose data=s out=wide; by month; id track; var minutes; run;','Sort BY first, with one value per BY and ID pair: add up duplicates before.'],
    sas22:['arrays','ARRAY','Applies one rule to many columns in a loop.','array k{*} bowl snack; do i = 1 to dim(k); if k{i} = . then k{i} = 0; end;','An array only names columns; it stores nothing. Drop the loop counter (drop i;).'],
    sas7:['macro','%MACRO','Writes a step once with blanks to fill, then runs it for each value.','%macro pull(data=, out=); … %mend; %pull(data=work.mind, out=m)','OPTIONS MPRINT shows the code each call writes. &vars resolve inside double quotes, not single.'],
    sas23:['into','INTO :','Puts values from the data into a macro variable, to use as text in later steps.',"select distinct track into :tracks separated by ' ' from work.study;",'Macro variables are text. Check one with %put &tracks;.'],
    sas8:['passthru','CONNECT','Sends your SQL straight to the database, which runs it and sends back only the result.','select * from connection to postgres (select …);','The inner query is in the database’s own SQL, not SAS’s. Keep passwords out of the code.'],
    sas24:['excel','ODS EXCEL','Sends printed output into a workbook, a sheet per table.',"ods excel file=\"training.xlsx\" options(sheet_name='Lifts'); … ods excel close;",'Nothing is written until ODS EXCEL CLOSE.'],
    tab1:['extract','Extract','A live connection asks the source every time; an extract is a fast snapshot you refresh.','Data → mind → Extract Data… (hide unused fields)','An extract is only as fresh as its last refresh. Filters and hidden fields keep it small.'],
    tab2:['group','SUM','Dimensions split the view into headers; measures are added up inside each.','Rows: [Kind] · Columns: SUM([Kcal])','A measure is always aggregated, at the level the dimensions in the view set: SUM unless you pick another.'],
    tab9:['@disc','','Discrete (blue) fields make separate headers; continuous (green) fields make an axis.','WEEK([Day]): blue gives week headers, green a timeline','The colour decides header or axis, not whether the field is a dimension or a measure.'],
    tab10:['@marks','','Each dimension on the Marks card splits the view into more marks.','Detail: [Day] → one mark per day','Watch the mark count in the status bar: each dimension you add can multiply it.'],
    tab11:['having','filter','A dimension filter keeps rows; a measure filter keeps the aggregated results.','Filters: [Type] = Weighted · SUM([Sets]) at least 12','A measure filter runs after aggregation, like SQL’s HAVING.'],
    tab12:['melt','Measure Values','Puts several measures in one column of the view, labelled by Measure Names.','Columns: Measure Names · Text: Measure Values','Take the measures you don’t want off the Measure Values card.'],
    tab3:['@rel','','A relationship keeps both tables at their own detail and joins only what each sheet needs; a join merges rows up front.','Logical layer: drag Checkins next to Meals, match on [Day]','Joining meals (many a day) to check-ins (one a day) repeats each check-in; a relationship doesn’t.'],
    tab4:['derive','calc','A new field from a formula, computed on each row.','[Mood After] - [Mood Before]','Row-level: it runs before anything in the view is added up.'],
    tab13:['rowagg','SUM()','Row-level calcs run on each row before grouping; aggregate calcs run on the group’s totals.','SUM([Mood After]) - SUM([Mood Before])','One formula can’t mix the two: Tableau says “cannot mix aggregate and non-aggregate”.'],
    tab14:['@dual','','Two measures on one chart, each with its own axis: bars and a line.','Rows: SUM([Kcal]) SUM([Protein]) → Dual Axis','Synchronize the axes only when both measures share a unit.'],
    tab15:['@ref','','Adds an average (or any constant) line and a fitted trend to a chart.','Analytics pane → Average Line · Trend Line','A trend through few points says little: check its p-value in Describe Trend Model.'],
    tab16:['@dash','','Clicking a mark on one sheet filters the others on the dashboard.','Dashboard → Actions → Add Action → Filter','Decide what clearing the selection does: show all values, or none.'],
    tab17:['@param','','A control the viewer sets, used by a calc, a filter or a reference line.','[Pick side] → calc: [Side] = [Pick side] → filter on True','A parameter does nothing until something uses it. Show Parameter puts its control on the sheet.'],
    tab18:['join','blend','Brings in a second data source at the view’s level of detail, each side aggregated first.','Drag [Day] from Meals first (primary), then a Checkins field','Only the primary’s dimensions split the view; the secondary’s fields are aggregated (ATTR or *).'],
    tab5:['gtotal','FIXED','Computes a value at a level you fix, whatever the view’s dimensions are.','{ FIXED [Day] : SUM([Kcal]) }','FIXED ignores dimension filters unless you add them to context.'],
    tab19:['chain','INCLUDE','INCLUDE adds a dimension for the inner sum, EXCLUDE takes one away; then the view aggregates again.','AVG({ INCLUDE [Day] : SUM([Minutes]) })','Unlike FIXED, they move with the view’s dimensions and filters.'],
    tab6:['@runline','','Calcs on the numbers already in the view: running totals, differences, percent of total.','RUNNING_SUM(SUM([Pnl]))','Compute Using sets the direction: set it yourself (Table Across, or a field).'],
    tab20:['sets','Set','A group merges values into one; a set splits values into in and out.','Right-click [Practice] → Create → Group, or → Set','A set can follow a rule (the top 3); a group is a fixed list.'],
    tab7:['@funnel','','Filters apply in a fixed order: extract, data source, context, dimension, measure, then table calcs.','Right-click a filter → Add to Context','A Top N is worked out before your other dimension filters unless those are in context.'],
    tab21:['filtercalc','hide','Hides rows from the view but keeps them in the percent of total.','Filter on LOOKUP(ATTR([Practice]), 0)','A normal filter removes rows before table calcs, so the % changes; a table-calc filter only hides them.'],
    tab22:['sets','click','Clicking marks puts them in a set (or sets a parameter), and the view updates.','Dashboard → Actions → Add Action → Change Set Values','Choose what clearing the selection does: keep, add or remove all values.'],
    tab23:['@perf','','Records where a dashboard spends its time, so you tune the slowest part first.','Help → Settings and Performance → Start Performance Recording','Slow usually means too many marks, filters with many values, or a slow live source: extract and simplify.'],
    tab8:['passthru','script','A script builds the extract file and publishes it to the server, on a schedule.','HyperProcess → Inserter → publish with the REST API','Rebuild or append on purpose, not both. Keep tokens out of the script.'],
    tab24:['rls','USERNAME()','Each viewer sees only their rows: a filter matches each row’s owner to whoever is signed in.','[User] = USERNAME(), from an entitlements table','Filter in the data source, not on a sheet, so it can’t be removed. Test it as another user.']
  };
  const get=id=>G[id]||null;
  const pic=(id,big)=>{const g=get(id);if(!g)return '';const [f,op]=g;return f[0]==='@'?chart(f.slice(1),big):table(F[f],op,big)};
  // beside a lesson in a list
  const mini=id=>get(id)?`<span class="cp-mini" aria-hidden="true">${pic(id,false)}</span>`:'';
  // the guide
  const html=id=>{const g=get(id);if(!g)return '';
    return `<div class="cp"><div class="cp-pic">${pic(id,true)}</div><dl class="cp-l"><dt>Does</dt><dd>${esc(g[2])}</dd><dt>Write</dt><dd><code>${esc(g[3])}</code></dd><dt>Watch for</dt><dd>${esc(g[4])}</dd></dl></div>`};
  // TODAY's plan art (isionxxx ARCHITECTURE.md, 2h): a picture as a small SVG in the shared plan-art classes (pa-*), which
  // TODAY colours with the palette, light or dark, so it shows without this app's CSS. M: class here → [pa classes, attributes]
  const toArt=(svg,M)=>{try{const r=new DOMParser().parseFromString(svg,'image/svg+xml').documentElement;if(r.nodeName!=='svg')return '';
    [r,...r.querySelectorAll('*')].forEach(e=>{const k=[];(e.getAttribute('class')||'').split(/\s+/).forEach(c=>{const m=M[c];if(!m)return;if(m[0])k.push(m[0]);for(const a in m[1]||{})e.setAttribute(a,m[1][a])});
      e.removeAttribute('class');e.removeAttribute('style');e.removeAttribute('aria-hidden');if(k.length)e.setAttribute('class',k.join(' '))});
    return new XMLSerializer().serializeToString(r)}catch(e){return ''}};
  // TODAY's plan: the picture beside today's lesson
  const art=id=>get(id)?toArt(pic(id,false),{'cp-c0':['pa-c'],'cp-ca':['pa-p'],'cp-cb':['pa-s'],'cp-cx':['pa-x'],'cp-ch':['pa-sm',{fill:'none','stroke-width':'.6','stroke-dasharray':'1 1'}],
    'cp-c1':['pa-p'],'cp-c2':['pa-i'],'cp-c3':['pa-g'],'cp-ar':['pa-sm',{fill:'none','stroke-width':'1.5'}],'cp-bar':['pa-p'],'cp-soft':['pa-s'],'cp-blue':['pa-i'],'cp-dot':['pa-p'],
    'cp-line':['pa-sp',{fill:'none','stroke-width':'10'}],'cp-noodle':['pa-sp',{fill:'none','stroke-width':'10'}],'cp-green':['pa-sw'],'cp-axis':['pa-sb',{'stroke-width':'7'}],
    'cp-refl':['pa-sm',{'stroke-width':'7','stroke-dasharray':'18 12'}],'cp-tile':['pa-sb',{fill:'none','stroke-width':'7'}]}):'';
  return {get,mini,pic,html,art,size:Object.keys(G).length};
})();
