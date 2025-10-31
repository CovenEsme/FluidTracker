import FluidTargetForm from "@/app/components/FluidTargetForm";
import {
  getCurrentFluidTarget,
  setNewFluidTarget,
} from "@/app/lib/db/dbTarget";

const SetTarget = async (user_id, patient_id) => {
  var result = await getCurrentFluidTarget(3, 3);

  const currentTarget = result.millilitres ?? 2500;

  return (
    // <div>
    //   <FluidTargetForm
    //     currentTarget={currentTarget}
    //   />
    // </div>
    <div>
      <div>
        <form>
          <div className="row-sm">
            <div className="col flex-2">
              <div className="form-floating">
                <input
                  type="number"
                  name="fluid target"
                  id="fluid_target_input"
                  value={currentTarget}
                  step={50}
                  onChange={(event) =>
                    setNewFluidTarget(3, 3, parseInt(event.target.value))
                  }
                />
                <label htmlFor="fluid_target_input">Fluid Target: </label>
              </div>
            </div>
            <div className="">
              <input type="submit" value="Set" className="btn blue" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetTarget;
