class FaceClassifier {

    constructor() {
        this.typeList = [];
        this.coefList = [];
        this.previousParameters = [];
        this.coefficientLength = 18;
        this.resultTypes = [];
    }

    addModel(type, coefficients) {
        if (type && coefficients) {
            this.typeList.push(type);
            this.coefList.push(coefficients);
        }
    }

    predict(faceParameters) {
        this.resultTypes = [];
        this.resultValues = [];

        this.previousParameters.splice(0, this.previousParameters.length == 10 ? 1 : 0);
        this.previousParameters.push(faceParameters.slice(0));

        if (this.previousParameters.length > 9) {
            var meanParameters = [];
            
            for (var i = 0; i < faceParameters.length; i++) {
                meanParameters[i] = 0;
            }
            for (var i = 0; i < this.previousParameters.length; i++) {
                for (var j = 0; j < faceParameters.length; j++) {
                    meanParameters[j] += this.previousParameters[i][j];
                }
            }
            for (var i = 0; i < faceParameters.length; i++) {
                meanParameters[i] /= 10;
            }

            for (var i = 0; i < this.typeList.length; i++) {
                
                var type = this.typeList[i];
                var score = 0;
                
                for (var j = 0; j < this.coefficientLength; j++) {
                    score += this.coefList[i][j] * meanParameters[j + 6];
                }

                this.resultTypes.push(type);
                this.resultValues.push(1.0 / (1.0 + Math.exp(-score)));

            }
        }
    }

    getResultTypes() {
        return this.resultTypes;
    }

    getResultValues() {
        return this.resultValues;
    }

    getResult() {
        var resultType = null;
        var resultValue = 0.0;

        var types = this.resultTypes;
        var values = this.resultValues;

        for (var i = 0; i < values.length; i++) {
            if (values[i] > resultValue) {
                resultValue = values[i];
                resultType = types[i];
            }
        }

        return resultType;
    }

}