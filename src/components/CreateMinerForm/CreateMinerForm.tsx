import { SubmitHandler, useForm } from 'react-hook-form';

interface Planet {
  id: string;
  name: string;
}

export interface CreateMinerFormProps {
  planet: Planet;
  minerals: number;
}

interface IFormInput {
  name: string;
  planetId: string;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
}

export default function CreateMinerForm({ planet, minerals }: CreateMinerFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      planetId: planet.id,
    },
  });

  // Total points that can be assigned
  const totalPoints = minerals;
  // Calculate used points based on the watched fields
  const usedPoints =
    (Number(watch('carryCapacity')) || 0) + (Number(watch('travelSpeed')) || 0) + (Number(watch('miningSpeed')) || 0);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-dark p-6 rounded-lg">
      <label className="block text-gray mb-2">Name</label>
      <input
        {...register('name', { required: 'Name is required' })}
        className="mb-4 p-2 rounded bg-gray-light text-white w-full"
      />
      {errors.name && <span className="text-red">{errors.name.message}</span>}

      <label className="block text-gray mb-2">Planet</label>
      <select
        {...register('planetId', { required: 'Planet is required' })}
        className="mb-4 p-2 rounded bg-gray-light text-white w-full"
      >
        <option value={planet.id}>{planet.name}</option>
      </select>

      <h3 className="text-white text-center py-4 text-lg mb-4">Assign points</h3>
      <div className="flex justify-between mb-4 gap-4">
        <div>
          <label className="block text-gray mb-2">carryCapacity</label>
          <input
            {...register('carryCapacity', { min: 0, max: totalPoints })}
            type="number"
            className="p-2 rounded bg-gray-light text-white"
            defaultValue={0}
          />
        </div>
        <div>
          <label className="block text-gray mb-2">travelSpeed</label>
          <input
            {...register('travelSpeed', { min: 0, max: totalPoints })}
            type="number"
            className="p-2 rounded bg-gray-light text-white"
            defaultValue={0}
          />
        </div>
        <div>
          <label className="block text-gray mb-2">miningSpeed</label>
          <input
            {...register('miningSpeed', { min: 0, max: totalPoints })}
            type="number"
            className="p-2 rounded bg-gray-light text-white"
            defaultValue={0}
          />
        </div>
      </div>

      <div className={`${usedPoints > totalPoints ? 'text-red' : 'text-green'} mb-4`}>
        Total: {usedPoints}/{totalPoints}
      </div>

      <div className="flex justify-center">
        <input
          type="submit"
          value="Save"
          className={`bg-white w-40 hover:bg-gray text-dark font-bold py-2 px-4 rounded cursor-pointer ${usedPoints > totalPoints ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={usedPoints > totalPoints}
        />
      </div>
    </form>
  );
}
