const Trip = require('../models/Trip');

class TripController {
  async getTrips(req, res) {
    try {
      console.log('Buscando viagens...');
      console.log('Modelo Trip:', Trip);
      console.log('Nome da coleção:', Trip.collection.name);
      const trips = await Trip.find().sort({ date: -1 });
      console.log('Query executada');
      console.log('Viagens encontradas:', trips.length);
      console.log('Primeira viagem:', trips[0]);
      res.json(trips);
    } catch (error) {
      console.error('Erro ao buscar viagens:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getTripById(req, res) {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: 'Viagem não encontrada' });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTrip(req, res) {
    const trip = new Trip(req.body);
    try {
      const newTrip = await trip.save();
      res.status(201).json(newTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTrip(req, res) {
    try {
      const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!trip) {
        return res.status(404).json({ message: 'Viagem não encontrada' });
      }
      res.json(trip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTrip(req, res) {
    try {
      const trip = await Trip.findByIdAndDelete(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: 'Viagem não encontrada' });
      }
      res.json({ message: 'Viagem deletada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TripController;
