import { SubmitHandler, useForm } from 'react-hook-form';
import { MinerData, createMiner } from '../../api/miners';

interface Planet {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface CreateMinerFormProps {
  planet: Planet;
  minerals: number;
  onCreateSuccess?: () => void;
}

interface IFormInput {
  name: string;
  planetId: string;
  carryCapacity: number;
  travelSpeed: number;
  miningSpeed: number;
}

export default function CreateMinerForm({ planet, minerals, onCreateSuccess }: CreateMinerFormProps) {
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { planetId: id, ...res } = data;
    const formData: MinerData = {
      ...res,
      x: planet.x,
      y: planet.y,
      angle: 0,
      status: 0,
      minerals: 0,
      planet: id,
      target: id,
      targetType: 'Planet',
    };
    const response = await createMiner(formData);
    response.name && onCreateSuccess && onCreateSuccess();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-dark p-6 rounded-lg">
        {/* Since there is no API check for duplicated name, only name is required in this stage */}
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
          <div className="flex flex-col w-44">
            <label className="block text-gray mb-2">Carry Capacity</label>
            <input
              {...register('carryCapacity', {
                required: 'Carry capacity is required',
                min: { value: 1, message: 'Carry capacity must be at least 1' },
                max: { value: 200, message: 'Carry capacity cannot exceed 200' },
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={1}
              className="p-2 rounded bg-gray-light text-white"
            />
            {errors.carryCapacity && <span className="text-red">{errors.carryCapacity.message}</span>}
          </div>

          <div className="flex flex-col w-44">
            <label className="block text-gray mb-2">Travel Speed</label>
            <input
              {...register('travelSpeed', {
                required: 'Travel speed is required',
                min: { value: 1, message: 'Travel speed must be at least 1' },
                max: { value: 200, message: 'Travel speed cannot exceed 200' },
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={1}
              className="p-2 rounded bg-gray-light text-white"
            />
            {errors.travelSpeed && <span className="text-red">{errors.travelSpeed.message}</span>}
          </div>

          <div className="flex flex-col w-44">
            <label className="block text-gray mb-2">Mining Speed</label>
            <input
              {...register('miningSpeed', {
                required: 'Mining speed is required',
                min: { value: 1, message: 'Mining speed must be at least 1' },
                max: { value: 200, message: 'Mining speed cannot exceed 200' },
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={1}
              className="p-2 rounded bg-gray-light text-white"
            />
            {errors.miningSpeed && <span className="text-red">{errors.miningSpeed.message}</span>}
          </div>
        </div>

        <div className={`${usedPoints > totalPoints ? 'text-red' : 'text-green'} mb-4`}>
          Total: {usedPoints > totalPoints ? totalPoints - usedPoints : usedPoints}/{totalPoints}
          {usedPoints > totalPoints}
        </div>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Save"
            className={`bg-white w-40 text-dark font-bold py-2 px-4 rounded cursor-pointer ${usedPoints > totalPoints ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={usedPoints > totalPoints}
          />
        </div>
      </form>
    </>
  );
}
