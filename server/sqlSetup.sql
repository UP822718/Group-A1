CREATE TABLE IF NOT EXISTS fitnessprofile.Profile (
  idProfile INT NOT NULL,
  Name VARCHAR(45) NULL,
  PRIMARY KEY (idProfile))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table fitnessprofile.authentication
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fitnessprofile.authentication (
  idauthenticationID INT NOT NULL,
  userName VARCHAR(45) NULL,
  password VARCHAR(45) NULL,
  Profile_idProfile INT NOT NULL,
  PRIMARY KEY (idauthenticationID),
  INDEX fk_authentication_Profile_idx (Profile_idProfile ASC),
  CONSTRAINT fk_authentication_Profile
    FOREIGN KEY (Profile_idProfile)
    REFERENCES fitnessprofile.Profile (idProfile)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table fitnessprofile.Hydration
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fitnessprofile.Hydration (
  idHydration INT NOT NULL,
  Profile_idProfile INT NOT NULL,
  Hydrationcol VARCHAR(45) NULL,
  PRIMARY KEY (idHydration, Profile_idProfile),
  INDEX fk_Hydration_Profile1_idx (Profile_idProfile ASC),
  CONSTRAINT fk_Hydration_Profile1
    FOREIGN KEY (Profile_idProfile)
    REFERENCES fitnessprofile.Profile (idProfile)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table fitnessprofile.Weight
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fitnessprofile.Weight (
  idWeight INT NOT NULL,
  Profile_idProfile INT NOT NULL,
  kg DOUBLE NULL,
  PRIMARY KEY (idWeight, Profile_idProfile),
  INDEX fk_Weight_Profile1_idx (Profile_idProfile ASC),
  CONSTRAINT fk_Weight_Profile1
    FOREIGN KEY (Profile_idProfile)
    REFERENCES fitnessprofile.Profile (idProfile)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table fitnessprofile.Calories
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fitnessprofile.Calories (
  idCalories INT NOT NULL,
  Profile_idProfile INT NOT NULL,
  calories INT NULL,
  PRIMARY KEY (idCalories, Profile_idProfile),
  INDEX fk_Calories_Profile1_idx (Profile_idProfile ASC),
  CONSTRAINT fk_Calories_Profile1
    FOREIGN KEY (Profile_idProfile)
    REFERENCES fitnessprofile.Profile (idProfile)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table fitnessprofile.Steps
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS fitnessprofile.Steps (
  idSteps INT NOT NULL,
  Profile_idProfile INT NOT NULL,
  Stepscount MEDIUMTEXT NULL,
  PRIMARY KEY (idSteps, Profile_idProfile),
  INDEX fk_Steps_Profile1_idx (Profile_idProfile ASC),
  CONSTRAINT fk_Steps_Profile1
    FOREIGN KEY (Profile_idProfile)
    REFERENCES fitnessprofile.Profile (idProfile)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
