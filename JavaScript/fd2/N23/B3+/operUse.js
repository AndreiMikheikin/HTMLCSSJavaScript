function operUse(a,b,oper) {
    if (oper === '+') return (a+b);
    if (oper === '-') return (a-b);
    if (oper === '*') return (a*b);
    if (oper === '/') return (b !== 0  ? (a/b) : Infinity);
}