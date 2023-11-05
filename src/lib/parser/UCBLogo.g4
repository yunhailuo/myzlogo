/* Derived from https://github.com/antlr/grammars-v4/tree/master/logo/ucb-logo */
grammar UCBLogo;

@parser::members {
  // A Map keeping track of all procedure (and macro) names and the amount
  // of parameters each procedure expects.
  // Taken from: http://www.cs.berkeley.edu/~bh/usermanual
  this.procedures = {
    "word": 2,
    "list": 2,
    "sentence": 2,
    "se": 2,
    "fput": 2,
    "lput": 2,
    "array": 1,
    "mdarray": 1,
    "listtoarray": 1,
    "arraytolist": 1,
    "combine": 2,
    "reverse": 1,
    "gensym": 0,
    "first": 1,
    "firsts": 1,
    "last": 1,
    "butfirst": 1,
    "bf": 1,
    "butfirsts": 1,
    "bfs": 1,
    "butlast": 1,
    "bl": 1,
    "item": 2,
    "mditem": 2,
    "pick": 1,
    "remove": 2,
    "remdup": 1,
    "quoted": 1,
    "setitem": 3,
    "mdsetitem": 3,
    ".setfirst": 2,
    ".setbf": 2,
    ".setitem": 3,
    "push": 2,
    "pop": 1,
    "queue": 2,
    "dequeue": 1,
    "wordp": 1,
    "word?": 1,
    "listp": 1,
    "list?": 1,
    "arrayp": 1,
    "array?": 1,
    "emptyp": 1,
    "empty?": 1,
    "equalp": 2,
    "equal?": 2,
    "notequalp": 2,
    "notequal?": 2,
    "beforep": 2,
    "before?": 2,
    ".eq": 2,
    "memberp": 2,
    "member?": 2,
    "substringp": 2,
    "substring?": 2,
    "numberp": 1,
    "number?": 1,
    "vbarredp": 1,
    "vbarred?": 1,
    "backslashedp": 1,
    "backslashed?": 1,
    "count": 1,
    "ascii": 1,
    "rawascii": 1,
    "char": 1,
    "member": 2,
    "lowercase": 1,
    "uppercase": 1,
    "standout": 1,
    "parse": 1,
    "runparse": 1,
    "print": 1,
    "pr": 1,
    "type": 1,
    "show": 1,
    "readlist": 0,
    "rl": 0,
    "readword": 0,
    "rw": 0,
    "readrawline": 0,
    "readchar": 0,
    "rc": 0,
    "readchars": 1,
    "rcs": 1,
    "shell": 1,
    "setprefix": 1,
    "prefix": 0,
    "openread": 1,
    "openwrite": 1,
    "openappend": 1,
    "openupdate": 1,
    "close": 1,
    "allopen": 0,
    "closeall": 0,
    "erasefile": 1,
    "erf": 1,
    "dribble": 1,
    "nodribble": 0,
    "setread": 1,
    "setwrite": 1,
    "reader": 0,
    "writer": 0,
    "setreadpos": 1,
    "setwritepos": 1,
    "readpos": 0,
    "writepos": 0,
    "eofp": 0,
    "eof?": 0,
    "filep": 1,
    "file?": 1,
    "keyp": 0,
    "key?": 0,
    "cleartext": 0,
    "ct": 0,
    "setcursor": 1,
    "cursor": 0,
    "setmargins": 1,
    "settextcolor": 2,
    "settc": 2,
    "increasefont": 0,
    "decreasefont": 0,
    "settextsize": 1,
    "textsize": 0,
    "setfont": 1,
    "font": 0,
    "sum": 2,
    "difference": 2,
    "minus": 1,
    "product": 2,
    "quotient": 2,
    "remainder": 2,
    "modulo": 2,
    "int": 1,
    "round": 1,
    "sqrt": 1,
    "power": 2,
    "exp": 1,
    "log10": 1,
    "ln": 1,
    "sin": 1,
    "radsin": 1,
    "cos": 1,
    "radcos": 1,
    "arctan": 1,
    "radarctan": 1,
    "iseq": 2,
    "rseq": 3,
    "lessp": 2,
    "less?": 2,
    "greaterp": 2,
    "greater?": 2,
    "lessequalp": 2,
    "lessequal?": 2,
    "greaterequalp": 2,
    "greaterequal?": 2,
    "random": 1,
    "rerandom": 0,
    "form": 3,
    "bitand": 2,
    "bitor": 2,
    "bitxor": 2,
    "bitnot": 1,
    "ashift": 2,
    "lshift": 2,
    "and": 2,
    "or": 2,
    "not": 1,
    "forward": 1,
    "fd": 1,
    "back": 1,
    "bk": 1,
    "left": 1,
    "lt": 1,
    "right": 1,
    "rt": 1,
    "setpos": 1,
    "setxy": 2,
    "setx": 1,
    "sety": 1,
    "setheading": 1,
    "seth": 1,
    "home": 0,
    "arc": 2,
    "pos": 0,
    "xcor": 0,
    "ycor": 0,
    "heading": 0,
    "towards": 1,
    "scrunch": 0,
    "showturtle": 0,
    "st": 0,
    "hideturtle": 0,
    "ht": 0,
    "clean": 0,
    "clearscreen": 0,
    "cs": 0,
    "wrap": 0,
    "window": 0,
    "fence": 0,
    "fill": 0,
    "filled": 2,
    "label": 1,
    "setlabelheight": 1,
    "textscreen": 0,
    "ts": 0,
    "fullscreen": 0,
    "fs": 0,
    "splitscreen": 0,
    "ss": 0,
    "setscrunch": 2,
    "refresh": 0,
    "norefresh": 0,
    "shownp": 0,
    "shown?": 0,
    "screenmode": 0,
    "turtlemode": 0,
    "labelsize": 0,
    "pendown": 0,
    "pd": 0,
    "penup": 0,
    "pu": 0,
    "penpaint": 0,
    "ppt": 0,
    "penerase": 0,
    "pe": 0,
    "penreverse": 0,
    "px": 0,
    "setpencolor": 1,
    "setpc": 1,
    "setpalette": 2,
    "setpensize": 1,
    "setpenpattern": 1,
    "setpen": 1,
    "setbackground": 1,
    "setbg": 1,
    "pendownp": 0,
    "pendown?": 0,
    "penmode": 0,
    "pencolor": 0,
    "pc": 0,
    "palette": 1,
    "pensize": 0,
    "penpattern": 0,
    "pen": 0,
    "background": 0,
    "bg": 0,
    "savepict": 1,
    "loadpict": 1,
    "epspict": 1,
    "mousepos": 0,
    "clickpos": 0,
    "buttonp": 0,
    "button?": 0,
    "button": 0,
    "define": 2,
    "text": 1,
    "fulltext": 1,
    "copydef": 2,
    "make": 2,
    "name": 2,
    "local": 1,
    "localmake": 2,
    "thing": 1,
    ":quoted.varname": 0,
    "global": 1,
    "pprop": 3,
    "gprop": 2,
    "remprop": 2,
    "plist": 1,
    "procedurep": 1,
    "procedure?": 1,
    "primitivep": 1,
    "primitive?": 1,
    "definedp": 1,
    "defined?": 1,
    "namep": 1,
    "name?": 1,
    "plistp": 1,
    "plist?": 1,
    "contents": 0,
    "buried": 0,
    "traced": 0,
    "stepped": 0,
    "procedures": 0,
    "primitives": 0,
    "names": 0,
    "plists": 0,
    "namelist": 1,
    "pllist": 1,
    "arity": 1,
    "nodes": 0,
    "printout": 1,
    "po": 1,
    "poall": 0,
    "pops": 0,
    "pons": 0,
    "popls": 0,
    "pon": 1,
    "popl": 1,
    "pot": 1,
    "pots": 0,
    "erase": 1,
    "er": 1,
    "erall": 0,
    "erps": 0,
    "erns": 0,
    "erpls": 0,
    "ern": 1,
    "erpl": 1,
    "bury": 1,
    "buryall": 0,
    "buryname": 1,
    "unbury": 1,
    "unburyall": 0,
    "unburyname": 1,
    "buriedp": 1,
    "buried?": 1,
    "trace": 1,
    "untrace": 1,
    "tracedp": 1,
    "traced?": 1,
    "step": 1,
    "unstep": 1,
    "steppedp": 1,
    "stepped?": 1,
    "edit": 1,
    "ed": 1,
    "editfile": 1,
    "edall": 0,
    "edps": 0,
    "edns": 0,
    "edpls": 0,
    "edn": 1,
    "edpl": 1,
    "save": 1,
    "savel": 2,
    "load": 1,
    "cslsload": 1,
    "help": 1,
    "seteditor": 1,
    "setlibloc": 1,
    "sethelploc": 1,
    "setcslsloc": 1,
    "settemploc": 1,
    "gc": 0,
    ".setsegmentsize": 1,
    "run": 1,
    "runresult": 1,
    "repeat": 2,
    "forever": 1,
    "repcount": 0,
    "if": 2,
    "ifelse": 3,
    "test": 1,
    "iftrue": 1,
    "ift": 1,
    "iffalse": 1,
    "iff": 1,
    "stop": 0,
    "output": 1,
    "op": 1,
    "catch": 2,
    "throw": 1,
    "error": 0,
    "pause": 0,
    "continue": 1,
    "co": 1,
    "wait": 1,
    "bye": 0,
    ".maybeoutput": 1,
    "goto": 1,
    "tag": 1,
    "ignore": 1,
    "`": 1,
    "for": 2,
    "do.while": 2,
    "while": 2,
    "do.until": 2,
    "until": 2,
    "case": 2,
    "cond": 1,
    "apply": 2,
    "invoke": 2,
    "foreach": 2,
    "map": 2,
    "map.se": 2,
    "filter": 2,
    "find": 2,
    "reduce": 2,
    "crossmap": 2,
    "cascade": 3,
    "cascade.2": 5,
    "transfer": 3,
    ".defmacro": 2,
    "macrop": 1,
    "macro?": 1,
    "macroexpand": 1,
  };

  // A flag keeping track if the parser already looked ahead to resolve user
  // defined procedures that will be stored in the 'procedures' map.
  this.discoveredAllProcedures = false;

  /**
    * Returns {@code true} iff the next token in the inout stream is of
    * type {@code NAME} and is present in the {@code procedures}.
    *
    * @returns {@code true} iff the next token in the inout stream is of
    * type {@code NAME} and is present in the {@code procedures}.
    */
  this.procedureNameAhead = function() {
    const token = this._input.LT(1);
    return token.type == UCBLogoParser.NAME && (token.text.toLowerCase() in this.procedures);
  }

  // The first pass with `discoveredAllProcedures = false` to collect all user
  // defined procedures and macros.
  this.ucblogo();
  // Reset the input stream after having resolved the user defined procedures.
  input.reset();
  this.discoveredAllProcedures = true;
}

@lexer::members {
  // Counters that keep track of how deep the lexer is currently in a list
  // or array. Depending on this value, a "FOO" is either tokenized as a NAME
  // (when not inside a list or array) or else as a WORD (when inside a list
  // or array).
  this.listDepth = 0;
  this.arrayDepth = 0;
}

ucblogo
 : instruction* EOF
 ;

instruction
 : procedure_def               #procedureDefInstruction
 | macro_def                   #macroDefInstruction
 | procedure_call_extra_input  #procedureCallExtraInputInstruction
 | procedure_call              #procedureCallInstruction
 ;

procedure_def
 : TO NAME variables body_def
   {
     this.procedures[$NAME.text] = $variables.amount;
   }
 ;

macro_def
 : MACRO NAME variables body_def
   {
     this.procedures[$NAME.text] = $variables.amount;
   }
 ;

variables returns [int amount]
 : {$amount = 0;} ( VARIABLE {$amount++;} )*
 ;

body_def
 : {this.discoveredAllProcedures}? body_instruction* END
 |                            ~END* END
 ;

body_instruction
 : procedure_call_extra_input
 | procedure_call
 ;

procedure_call_extra_input
 : '(' {this.procedureNameAhead()}? NAME expression* ')'
 ;

procedure_call
 : {this.procedureNameAhead()}? NAME expressions[$NAME.text, this.procedures[$NAME.text.toLowerCase()]]
 ;

expressions[String name, int total]
locals[int n = 0]      // a counter to keep track of how many expressions we've parsed
 : (
     {$n < $total}?    // check if we've parsed enough expressions
     expression
     {$n++;}           // increments the amount of  expressions we've parsed
   )*

   {
     // Make sure there are enough inputs parsed for 'name'.
     if ($total > $n) {
       throw new antlr4.error.FailedPredicateException(this, "not enough inputs to " + name);
     }
   }
 ;

expression
 : '-' expression                                         #unaryMinusExpression
 | procedure_call_extra_input                             #procedureCallExtraInput
 | procedure_call                                         #procedureCallExpression
 | '(' expression ')'                                     #parensExpression
 | array_                                                 #arrayExpression
 | list_                                                  #listExpression
 | WORD                                                   #wordExpression
 | QUOTED_WORD                                            #quotedWordExpression
 | NUMBER                                                 #numberExpression
 | VARIABLE                                               #variableExpression
 | NAME                                                   #nameExpression
 | expression op=('*'|'/') expression                     #mulDivExpression
 | expression op=('+'|'-') expression                     #addSubExpression
 | expression op=('<'|'>'|'<='|'>='|'='|'<>') expression  #comparisonExpression
 ;

array_
 : '{' ( ~( '{' | '}' ) | array_ )* '}'
 ;

list_
 : OPEN_LIST ( WORD | list_ )* CLOSE_LIST
 ;

TO    : T O;
END   : E N D;
MACRO : '.' M A C R O;

WORD
 : {this.listDepth > 0}?  ~[ \t\r\n[\];] ( ~[ \t\r\n[\];~] | LINE_CONTINUATION | '\\' ( [ \t[\]();~] | LINE_BREAK ) )*
 | {this.arrayDepth > 0}? ~[ \t\r\n{};]   ( ~[ \t\r\n};~]  | LINE_CONTINUATION | '\\' ( [ \t{}();~]   | LINE_BREAK ) )*
 ;

SKIP_
 : ( COMMENT | LINE_BREAK | SPACES | LINE_CONTINUATION ) -> skip
 ;

OPEN_ARRAY
 : '{' {this.arrayDepth++;}
 ;

CLOSE_ARRAY
 : '}' {this.arrayDepth--;}
 ;

OPEN_LIST
 : '[' {this.listDepth++;}
 ;

CLOSE_LIST
 : ']' {this.listDepth--;}
 ;


MINUS  : '-';
PLUS   : '+';
MULT   : '*';
DIV    : '/';
LT     : '<';
GT     : '>';
EQ     : '=';
LT_EQ  : '<=';
GT_EQ  : '>=';
NOT_EQ : '<>';

QUOTED_WORD
 : '"' ( ~[ \t\r\n[\]();~] | LINE_CONTINUATION | '\\' ( [ \t[\]();~] | LINE_BREAK ) )*
 ;

NUMBER
 : [0-9]+ ( '.' [0-9]+ )?
 ;

VARIABLE
 : ':' NAME
 ;

NAME
 : ~[-+*/=<> \t\r\n[\]()":{}] ( ~[-+*/=<> \t\r\n[\](){}] | LINE_CONTINUATION | '\\' [-+*/=<> \t\r\n[\]();~{}] )*
 ;

ANY
 : . {console.log("unexpected char: " + getText());}
 ;

fragment COMMENT
 : ';' ~[\r\n~]*
 ;

fragment LINE_CONTINUATION
 : COMMENT? '~' SPACES? LINE_BREAK
 ;

fragment LINE_BREAK
 : '\r'? '\n'
 | '\r'
 ;

fragment SPACES
 : [ \t]+
 ;

fragment SPACE_CHARS
 : [ \t\r\n]+
 ;

fragment A : [Aa];
fragment B : [Bb];
fragment C : [Cc];
fragment D : [Dd];
fragment E : [Ee];
fragment F : [Ff];
fragment G : [Gg];
fragment H : [Hh];
fragment I : [Ii];
fragment J : [Jj];
fragment K : [Kk];
fragment L : [Ll];
fragment M : [Mm];
fragment N : [Nn];
fragment O : [Oo];
fragment P : [Pp];
fragment Q : [Qq];
fragment R : [Rr];
fragment S : [Ss];
fragment T : [Tt];
fragment U : [Uu];
fragment V : [Vv];
fragment W : [Ww];
fragment X : [Xx];
fragment Y : [Yy];
fragment Z : [Zz];
