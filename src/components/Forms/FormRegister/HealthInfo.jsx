import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, Input} from '@chakra-ui/react';

const HealthInfo = () => {
  const { register } = useFormContext();

  return (
    <>
      <FormControl id="birthDate">
        <FormLabel>Fecha de Nacimiento</FormLabel>
        <Input type="date" {...register('birthDate')} />
      </FormControl>
      <FormControl id="averagePeriodLength">
        <FormLabel>Duración de tu menstruación</FormLabel>
        <Input type="number" placeholder="Duración de tu menstruación" {...register('averagePeriodLength')} />
      </FormControl>
      <FormControl id="averageCycleLength">
        <FormLabel>Duración de tu ciclo</FormLabel>
        <Input type="number" placeholder="Duración de tu ciclo" {...register('averageCycleLength')} />
      </FormControl>
    </>
  );
};

export default HealthInfo