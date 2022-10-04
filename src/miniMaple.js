class MiniMaple{
    _termRegex = /[+-]?[\*\d\^a-z]+/gm;
    _inTermRegex = /([+-]?)(\d*)\*?([a-z]+)(\^(\d+)|$)/m;

    checkEquation(eq){
        const regex = /^((\-|\+)((\d+\*)?([a-z](\^\d+)?)|(\d+)(\*[a-z](\^\d+)?)?))+$/gm;
        return regex.test(eq);
    }

    diff(equation, x){
        equation = equation.replace(/\s+/g, '');
        if (equation[0] != '-') equation = '+'.concat(equation);
        if(!this.checkEquation(equation)){
            return 'Error';
        }
        let m;
        let result = '';
        while ((m = this._termRegex.exec(equation)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this._termRegex.lastIndex) {
                this._termRegex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                //console.log(`Found match, group ${groupIndex}: ${match}`);
                const term = this._inTermRegex.exec(match);
                console.log(term)
                if(term != null){
                    const sign = term[1];
                    let cf = parseInt(term[2]);
                    if (isNaN(cf)) cf = 1
                    const variable = term[3];
                    const degree = parseInt(term[5] ?? 1);
                    if(variable === x){
                        result += sign ?? '';
                        //console.log(sign)
                        result += degree * cf;
                        if (degree == 2) result += '*'+variable;
                        else {
                            if (degree != 1) {
                                result += '*'+variable;
                                result += '^'+(degree - 1);
                            }
                        }
                    }
                }
                else {
                    return "Error"
                }
            });
        }
        if (result[0] == "+") result = result.slice(1)
        if (result =="") return "0"
        return result;
    }
}

export {MiniMaple}