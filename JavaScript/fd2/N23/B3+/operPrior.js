function operPrior(oper) {
    if (oper === '+' || oper === '-') return 1;
    if (oper === '*' || oper === '/') return 2;
    return 0;
}