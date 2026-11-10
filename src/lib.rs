//! Treinen - Cross Platform WebAssembly Spoorwegsimulatie
//! Biedt een high-performance simulatie-engine gecompileerd naar WebAssembly.

use wasm_bindgen::prelude::*;

pub const MAX_TRAINS: usize = 32;
pub const STATION_COUNT: usize = 8;
pub const TRACK_COUNT: usize = 18;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum TrainType {
    IntercityVIRM = 0,
    SprinterSLT = 1,
    CargoTraxx = 2,
    Eurostar = 3,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq)]
pub enum TrainState {
    Moving = 0,
    AtStation = 1,
    AtSignal = 2,
    EmergencyBrake = 3,
}

#[derive(Clone, Debug)]
pub struct Train {
    pub id: i32,
    pub train_type: TrainType,
    pub track_id: usize,
    pub progress: f32, // 0.0 tot 1.0
    pub speed: f32,    // km/u
    pub target_speed: f32,
    pub state: TrainState,
    pub dwell_timer: f32,
    pub passengers: i32,
    pub delay_sec: i32,
    pub current_station: usize,
    pub next_station: usize,
}

pub struct SimulationState {
    pub sim_time: f32,
    pub trains: Vec<Train>,
    pub next_train_id: i32,
    pub switches: [i32; 4],
    pub signals: [i32; 18],
}

static mut STATE: Option<SimulationState> = None;

#[wasm_bindgen]
pub fn init_simulation() {
    let mut initial_trains = Vec::new();

    // 1. Intercity VIRM Amsterdam -> Utrecht
    initial_trains.push(Train {
        id: 101,
        train_type: TrainType::IntercityVIRM,
        track_id: 0,
        progress: 0.15,
        speed: 130.0,
        target_speed: 140.0,
        state: TrainState::Moving,
        dwell_timer: 0.0,
        passengers: 312,
        delay_sec: 0,
        current_station: 0,
        next_station: 1,
    });

    // 2. Sprinter SLT Amsterdam -> Den Haag
    initial_trains.push(Train {
        id: 102,
        train_type: TrainType::SprinterSLT,
        track_id: 2,
        progress: 0.45,
        speed: 110.0,
        target_speed: 120.0,
        state: TrainState::Moving,
        dwell_timer: 0.0,
        passengers: 145,
        delay_sec: 60,
        current_station: 0,
        next_station: 3,
    });

    // 3. Eurostar Utrecht -> Eindhoven
    initial_trains.push(Train {
        id: 103,
        train_type: TrainType::Eurostar,
        track_id: 10,
        progress: 0.60,
        speed: 150.0,
        target_speed: 160.0,
        state: TrainState::Moving,
        dwell_timer: 0.0,
        passengers: 280,
        delay_sec: 0,
        current_station: 1,
        next_station: 4,
    });

    // 4. Cargo Traxx Zwolle -> Groningen
    initial_trains.push(Train {
        id: 104,
        train_type: TrainType::CargoTraxx,
        track_id: 16,
        progress: 0.30,
        speed: 90.0,
        target_speed: 95.0,
        state: TrainState::Moving,
        dwell_timer: 0.0,
        passengers: 0,
        delay_sec: 0,
        current_station: 6,
        next_station: 7,
    });

    unsafe {
        STATE = Some(SimulationState {
            sim_time: 0.0,
            trains: initial_trains,
            next_train_id: 105,
            switches: [0; 4],
            signals: [2; 18], // Alle seinen veilig (groen)
        });
    }
}

#[wasm_bindgen]
pub fn step_simulation(dt: f32) {
    let state = unsafe {
        match STATE.as_mut() {
            Some(s) => s,
            None => return,
        }
    };

    state.sim_time += dt;

    for train in state.trains.iter_mut() {
        match train.state {
            TrainState::EmergencyBrake => {
                train.speed = (train.speed - 90.0 * dt).max(0.0);
            }
            TrainState::AtStation => {
                train.dwell_timer -= dt;
                if train.dwell_timer <= 0.0 {
                    train.state = TrainState::Moving;
                    train.progress = 0.0;
                    train.speed = 25.0;
                    train.track_id ^= 1; // Keer om
                    std::mem::swap(&mut train.current_station, &mut train.next_station);
                }
            }
            TrainState::Moving => {
                if train.speed < train.target_speed {
                    train.speed = (train.speed + 18.0 * dt).min(train.target_speed);
                }
                train.progress += (train.speed / 140.0) * 0.045 * dt;
                if train.progress >= 1.0 {
                    train.state = TrainState::AtStation;
                    train.speed = 0.0;
                    train.progress = 1.0;
                    train.dwell_timer = 6.0;
                    train.passengers = ((train.passengers + 47) % 350) + 50;
                }
            }
            TrainState::AtSignal => {
                train.speed = (train.speed - 50.0 * dt).max(0.0);
            }
        }
    }
}

#[wasm_bindgen]
pub fn get_sim_time() -> f32 {
    unsafe { STATE.as_ref().map_or(0.0, |s| s.sim_time) }
}

#[wasm_bindgen]
pub fn get_train_count() -> i32 {
    unsafe { STATE.as_ref().map_or(0, |s| s.trains.len() as i32) }
}

#[wasm_bindgen]
pub fn get_train_id(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(-1, |t| t.id) }
}

#[wasm_bindgen]
pub fn get_train_type(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.train_type as i32) }
}

#[wasm_bindgen]
pub fn get_train_track(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.track_id as i32) }
}

#[wasm_bindgen]
pub fn get_train_progress(idx: usize) -> f32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0.0, |t| t.progress) }
}

#[wasm_bindgen]
pub fn get_train_speed(idx: usize) -> f32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0.0, |t| t.speed) }
}

#[wasm_bindgen]
pub fn get_train_target_speed(idx: usize) -> f32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0.0, |t| t.target_speed) }
}

#[wasm_bindgen]
pub fn get_train_state(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.state as i32) }
}

#[wasm_bindgen]
pub fn get_train_passengers(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.passengers) }
}

#[wasm_bindgen]
pub fn get_train_delay(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.delay_sec) }
}

#[wasm_bindgen]
pub fn get_train_current_station(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.current_station as i32) }
}

#[wasm_bindgen]
pub fn get_train_next_station(idx: usize) -> i32 {
    unsafe { STATE.as_ref().and_then(|s| s.trains.get(idx)).map_or(0, |t| t.next_station as i32) }
}

#[wasm_bindgen]
pub fn add_train(train_type: i32, start_station: usize) -> i32 {
    let state = unsafe {
        match STATE.as_mut() {
            Some(s) => s,
            None => return -1,
        }
    };

    if state.trains.len() >= MAX_TRAINS {
        return -1;
    }

    let new_id = state.next_train_id;
    state.next_train_id += 1;

    let t_type = match train_type {
        1 => TrainType::SprinterSLT,
        2 => TrainType::CargoTraxx,
        3 => TrainType::Eurostar,
        _ => TrainType::IntercityVIRM,
    };

    state.trains.push(Train {
        id: new_id,
        train_type: t_type,
        track_id: start_station.min(TRACK_COUNT - 1),
        progress: 0.0,
        speed: 20.0,
        target_speed: 135.0,
        state: TrainState::Moving,
        dwell_timer: 0.0,
        passengers: 180,
        delay_sec: 0,
        current_station: start_station,
        next_station: (start_station + 1) % STATION_COUNT,
    });

    new_id
}

#[wasm_bindgen]
pub fn toggle_switch(switch_id: usize) -> i32 {
    let state = unsafe {
        match STATE.as_mut() {
            Some(s) => s,
            None => return 0,
        }
    };
    if switch_id < state.switches.len() {
        state.switches[switch_id] ^= 1;
        state.switches[switch_id]
    } else {
        0
    }
}

#[wasm_bindgen]
pub fn set_emergency_brake(train_id: i32, active: i32) -> i32 {
    let state = unsafe {
        match STATE.as_mut() {
            Some(s) => s,
            None => return 0,
        }
    };
    for train in state.trains.iter_mut() {
        if train.id == train_id {
            train.state = if active != 0 {
                TrainState::EmergencyBrake
            } else {
                TrainState::Moving
            };
            return 1;
        }
    }
    0
}

#[wasm_bindgen]
pub fn get_signal_state(idx: usize) -> i32 {
    unsafe { STATE.as_ref().map_or(2, |s| s.signals[idx % 18]) }
}

#[wasm_bindgen]
pub fn get_switch_state(idx: usize) -> i32 {
    unsafe { STATE.as_ref().map_or(0, |s| s.switches[idx % 4]) }
}

#[wasm_bindgen]
pub fn get_station_count() -> i32 {
    STATION_COUNT as i32
}
