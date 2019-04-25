const x_max_range = 2, y_max_range = 3, z_max_range = 3;
const x_min_range =-2, y_min_range = -1, z_min_range =0;
const equation = (x, y, z) => { //equation
    return (Math.pow(x, 2) - 2 * x * y * Math.pow(z, 2) + 2 * Math.pow(y, 2) * z - 5.7 * x * y * z + Math.pow(z, 2));
}

function random_number_for_x() {
    var random = (Math.random() * 4) - 2; //between 2 and -2
    return random;
}

function random_number_for_y() {
    var random = (Math.random() * 4) - 1; //between -1 and 3
    return random;
}

function random_number_for_z() {
    var random = (Math.random() * 3); // between 0 and 3
    return random;
}

const is_x_within_range = (val) => {
   return (val < x_max_range && val > x_min_range)? true : false 
}

const is_y_within_range = (val) => {
    return (val < y_max_range && val > y_min_range) ? true : false     
}

const is_z_within_range = (val) => {
   return (val < z_max_range && val > z_min_range) ? true : false     
}

function r1() {
    var random = (Math.random() * 1); // between 0 and 1
    return random;
}

function r2() {
    var random = (Math.random() * 1); // between 0 and 1
    return random;
}

// let ind = []; //ind[10][4]
// let v =  []; //v[10][3]
// let pbest = []; //pbest[10][4]
// let gbest = []; //gbest[4]
const c1 =2, c2 = 2;
 
const population = (initial_population_size ) => { // calculate initial particles 10 in size
    let array = [];
    let pbest = [];
    for (let i = 0; i < initial_population_size; i++) {
        array[i] = [];
        pbest[i] = [];
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0: //x
                    array[i][j] = random_number_for_x();
                    pbest[i][j] = array[i][j];
                    break;
                case 1: //y
                    array[i][j] = random_number_for_y();
                    pbest[i][j] = array[i][j];
                    break;
                case 2: //z
                    array[i][j] = random_number_for_z();
                    pbest[i][j] = array[i][j];
                    break;
                case 3:
                    array[i][j] = equation(array[i][j-3], array[i][j-2], array[i][j-1]) // fitness function
                    pbest[i][j] = array[i][j];
            }  
        }
    }
    return {init_arr : array, pbest : pbest}
}

function gbest_calculator (array) {
    array.sort((a, b) => {
        if (a[3] === b[3]) {
            return 0;
        }
        else {
            return (a[3] < b[3]) ? -1 : 1;
        }
    })
    // console.log(array)
    return array[array.length - 1];
}

function particle_position(array, pers_best, global_best) {
    // let arr = array;
    // console.log(array)
    let new_x_value, new_y_value, new_z_value;
    for (let i = 0; i < array.length; i++) {
        var x_within_range = true;
        var y_within_range = true;
        var z_within_range = true;
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0: //x
                new_x_value = array[i][j] + ((c1 * r1()) * (pers_best[i][j] - array[i][j])) + ((c2 * r2()) * (global_best[j] - array[i][j]))
                    if(is_x_within_range(new_x_value)){
                        console.log("In RANGE", array[i][j])
                    array[i][j] = new_x_value;
                    pers_best[i][j] = array[i][j];
                }else {
                    console.log("x is outside of the range, In else", array[i][j])
                    x_within_range = false;
                }
                    break;
                case 1: //y
                new_y_value = array[i][j] + ((c1 * r1()) * (pers_best[i][j] - array[i][j])) + ((c2 * r2()) * (global_best[j] - array[i][j]))
                if(is_y_within_range(new_y_value)){
                array[i][j] = new_y_value;
                pers_best[i][j] = array[i][j];
            }else {
                console.log("y is outside of the range, In else", array[i][j])
                y_within_range = false;
            }
                // array[i][j] = array[i][j] + ((c1 * r1()) * (pers_best[i][j] - array[i][j])) + ((c2 * r2()) * (global_best[j] - array[i][j]));
                // pbest[i][j] = array[i][j];
                    break;
                case 2: //z
                new_z_value = array[i][j] + ((c1 * r1()) * (pers_best[i][j] - array[i][j])) + ((c2 * r2()) * (global_best[j] - array[i][j]))
                if(is_z_within_range(new_z_value)){
                array[i][j] = new_z_value;
                pers_best[i][j] = array[i][j];
            }else {
                console.log("z is outside of the range, In else", array[i][j])
                z_within_range = false;
            }
                    break;
                case 3:
                if(x_within_range && y_within_range && z_within_range)
                array[i][j] = equation(array[i][j-3], array[i][j-2], array[i][j-1]);
                pers_best[i][j] = array[i][j];
                break;
                default : 
                break;
            }  
        }
    }
    return {ind : array, pbest : pers_best, gbest : gbest_calculator(pers_best)}
}

export const particle_swarm_optimization = (number_of_iterations) => {
    // return(number_of_iterations)
    let init_pop = population(10);
    let ind = init_pop.init_arr;
    let pbest = init_pop.pbest;
    let gbest = gbest_calculator(pbest);
    let history_ind = [] 
    let data = { 
        ind : ind,
        pbest : pbest,
        gbest : gbest
    };
    for (let i = 0; i < number_of_iterations; i++) {
        let fitness_arr = []
        console.log(data.ind);
        for (let j = 0; j < data.ind.length; j++) {
            fitness_arr[j] = data.ind[j][3];
        }
        history_ind.push(fitness_arr)
        data = particle_position(data.ind, data.pbest, data.gbest);                
        console.log('====================================');
        console.log('====================================');
    }
    console.log('**********************************');
    console.log(history_ind, "HistoryInd");
    console.log('**********************************');
    return {fitnesses : history_ind, global_best : data.gbest};
}
// console.log(ind);
//  export default particle_swarm_optimization;